import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showListFollow, showListRecommend } from "../../service/PostService";

import styles from "./Post.module.css";
import { SlOptionsVertical } from "react-icons/sl";

import TestRecommend from "../Test/TestRecommend";
import TestFollow from "../Test/TestFollow";

const PostList = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [isActiveButton, setIsActiveButton] = useState("recommend");

  const onClickType = (buttonType) => {
    setIsActiveButton(buttonType);
  };

  useEffect(() => {
    if (isActiveButton === "recommend") {
      fetchRecommendList();
    } else {
      fetchFollowList();
    }
  }, [isActiveButton]);

  const fetchRecommendList = () => {
    const recommendData = TestRecommend();
    setPostList(recommendData);
    // showListFollow()
    //   .then((response) => {
    //     setPostList(response.content);
    //     console.log(response);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     window.alert(e.exception.errorMessage);
    //   });
  };

  const fetchFollowList = () => {
    const followData = TestFollow();
    setPostList(followData);
    // showListFollow()
    //   .then((response) => {
    //     setPostList(response.content);
    //     console.log(response);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     window.alert(e.exception.errorMessage);
    //   });
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
        {postList.map((post) => (
          <div
            key={post.postId}
            className={styles.postListBox}
            onClick={() => onClickPost(post.postId)}
          >
            <img src='https://via.placeholder.com/790x300' alt='본문 이미지' />
            <div className={styles.postListBoxHeader}>
              <img src='https://via.placeholder.com/36' alt='프로필 이미지' />
              <p className={styles.headerNickname}>닉네임</p>
              <p className={styles.headerDetail}>좋아요 {post.likeCount}</p>
              <p className={styles.headerDetail}>댓글 {post.commentCount}</p>
              <SlOptionsVertical className={styles.headerOption} />
            </div>
            <h2>{post.title}</h2>
            <p className={styles.postListContent}>{post.content}</p>
            <p className={styles.postListDetail}>{post.createdDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PostList;
