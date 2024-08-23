import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { showListFollow, showListRecommend } from "../../service/PostService";

import styles from "./Post.module.css";
import { SlOptionsVertical } from "react-icons/sl";
import TestFollow from "../Test/TestFollow";

const PostList = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지 번호
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터 여부
  const [isActiveButton, setIsActiveButton] = useState("recommend");

  // 무한 스크롤 감지를 위한 참조
  const observer = useRef();

  // 무한 스크롤을 위해 마지막 게시물을 감지하는 콜백
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const onClickType = (buttonType) => {
    setIsActiveButton(buttonType);
    setPage(0);
    setPostList([]);
    setHasMore(true);
  };

  useEffect(() => {
    if (isActiveButton === "recommend") {
      fetchRecommendList();
    } else {
      fetchFollowList();
    }
  }, [isActiveButton, page]);

  const fetchRecommendList = () => {
    setLoading(true);
    showListRecommend(page)
      .then((response) => {
        console.log(response);
        const newPosts = response.data.content;
        setPostList((prevPostList) => [...prevPostList, ...newPosts]);
        setHasMore(newPosts.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        window.alert(e.exception.errorMessage);
        setLoading(false);
      });
  };

  const fetchFollowList = () => {
    setLoading(true);
    const followData = TestFollow().slice(page * 10, (page + 1) * 10);
    setPostList((prevPostList) => [...prevPostList, ...followData]);
    setHasMore(followData.length > 0);
    setLoading(false);
  };

  const onClickPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.listButtonBox}>
        <button
          className={
            isActiveButton === "recommend"
              ? `${styles.listButton} ${styles.active}`
              : styles.listButton
          }
          onClick={() => onClickType("recommend")}
        >
          추천
        </button>
        <button
          className={
            isActiveButton === "follow"
              ? `${styles.listButton} ${styles.active}`
              : styles.listButton
          }
          onClick={() => onClickType("follow")}
        >
          팔로우
        </button>
      </div>
      <div className={styles.postList}>
        {postList.map((post, index) => (
          <div
            key={post.postId} // 고유한 key 사용
            ref={postList.length === index + 1 ? lastPostElementRef : null} // 마지막 요소에만 ref 할당
            className={styles.postListBox}
            onClick={() => onClickPost(post.postId)}
          >
            <img
              src={"http://localhost:8080/display?filename=" + post.files}
              alt='본문 이미지'
            />
            <div className={styles.postListBoxHeader}>
              <img src='https://via.placeholder.com/36' alt='프로필 이미지' />
              <p className={styles.headerNickname}>{post.nickname}</p>
              <p className={styles.headerDetail}>좋아요 {post.likeCount}</p>
              <p className={styles.headerDetail}>댓글 {post.commentCount}</p>
              <SlOptionsVertical className={styles.headerOption} />
            </div>
            <h2>{post.title}</h2>
            <p className={styles.postListContent}>{post.content}</p>
            <p className={styles.postListDetail}>{post.createdDate}</p>
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default PostList;
