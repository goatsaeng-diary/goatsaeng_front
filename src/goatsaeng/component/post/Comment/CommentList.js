import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Comment.module.css";

const CommentList = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.commentList}>
        <div className={styles.commentItem}>
          <div className={styles.itemBox}>
            <img src='https://via.placeholder.com/36' alt='프로필 이미지' />
            <p className={styles.itemNickname}> 닉네임</p>
            <button className={styles.itemButton}>답글</button>
          </div>
          <div className={styles.itemBox2}>
            <p className={styles.itemContent}>댓글 내용입니둥</p>
            <p className={styles.itemCreatedDate}>2024.08.02 16:16</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommentList;
