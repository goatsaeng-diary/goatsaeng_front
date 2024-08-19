import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, showPost } from "../../service/PostService";

import styles from "./Post.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";

import CommentList from "./Comment/CommentList";

const PostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState("");
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = () => {
    showPost(id)
      .then((response) => {
        console.log(response);
        setPost(response.data);
      })
      .catch((e) => {
        console.log(e);
        window.alert(e.exception.errorMessage);
      });
  };

  const onClickGoBack = () => {
    navigate(-1);
  };

  const onClickProfile = (nickname) => {
    navigate(`/${nickname}`);
  };

  const onClickLike = () => {
    setLiked(!liked);
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
            닉네임
          </p>
          <p className={styles.pageCreatedDate}>{post.createdDate}</p>
        </div>
        <hr />
        <img src='https://via.placeholder.com/808x500' alt='본문 이미지' />
        <p className={styles.pageContent}>{post.content} </p>
        <div className={styles.pageDetail}>
          <div className={styles.likeButton} onClick={onClickLike}>
            <GoHeartFill
              className={`${styles.heart} ${liked ? styles.active : ""}`}
            />
            <p>{post.likeCount + (liked ? 1 : 0)}</p>
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
