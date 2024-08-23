import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, showPost, createLike } from "../../service/PostService";
import { showImage } from "../../service/ImageService";

import styles from "./Post.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";

import CommentList from "./Comment/CommentList";

const PostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isliked, setIsLiked] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);

  useEffect(() => {
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (post && post.files) {
      fetchImages(post.files);
    }
  }, [post]);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const fetchPost = () => {
    showPost(id)
      .then((response) => {
        setPost(response.data);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
        window.alert(e.error);
      });
  };

  const fetchImages = (filenames) => {
    const imagePromises = filenames.map((filename) =>
      showImage(filename)
        .then((response) => {
          const imageUrl = URL.createObjectURL(new Blob([response.data]));
          return imageUrl;
        })
        .catch((e) => {
          console.log(e);
          window.alert(`이미지 ${filename}를 불러오는 데 실패했습니다.`);
          return null;
        })
    );

    Promise.all(imagePromises).then((urls) => {
      setImageUrl(urls.filter((url) => url !== null));
    });
  };

  const onClickGoBack = () => {
    navigate(-1);
  };

  const onClickProfile = (nickname) => {
    navigate(`/${nickname}`);
  };

  const onClickLike = () => {
    createLike(id, isliked)
      .then((response) => {
        window.alert(response.message);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        window.alert(e.exception.errorMessage);
      });
  };

  const onClickUpdate = () => {
    navigate(`/post/${id}/update`);
  };

  const onClickDelete = () => {
    deletePost(id)
      .then((response) => {
        window.alert(response.message);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        window.alert(e.exception.errorMessage);
      });
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.page}>
        <FaArrowLeft className={styles.goBack} onClick={onClickGoBack} />
        <h2>{post.title}</h2>
        <div className={styles.pageHeader}>
          <img
            src='https://via.placeholder.com/36'
            alt='프로필 이미지'
            onClick={() => onClickProfile(post.nickname)}
          />
          <p
            className={styles.pageNickname}
            onClick={() => onClickProfile(post.nickname)}
          >
            {post.nickname}
          </p>
          <p className={styles.pageCreatedDate}>{post.createdDate}</p>
        </div>
        <hr />
        <div className={styles.imageContainer}>
          {imageUrl.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Post image ${index + 1}`}
              className={styles.contentImage}
            />
          ))}
        </div>
        <p className={styles.pageContent}>{post.content} </p>
        <div className={styles.pageDetail}>
          <div className={styles.likeButton} onClick={onClickLike}>
            <GoHeartFill
              className={`${styles.heart} ${isliked ? styles.active : ""}`}
            />
            <p>{post.likeCount + (isliked ? 1 : 0)}</p>
          </div>
          <p>
            <strong>댓글</strong> {post.commentCount}
          </p>
          <button className={styles.optionButton} onClick={onClickUpdate}>
            수정
          </button>
          <button className={styles.optionButton} onClick={onClickDelete}>
            삭제
          </button>
        </div>
        <CommentList planId={id} />
      </div>
    </div>
  );
};

export default PostPage;
