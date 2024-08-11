import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Post.module.css";
import { SlOptionsVertical } from "react-icons/sl";

const PostList = () => {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);
  const [isActiveButton, setIsActiveButton] = useState("recommend");

  const onClickType = (buttonType) => {
    setIsActiveButton(buttonType);
  };

  const onClickPost = (boardId) => {
    navigate(`/post/${boardId}`);
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
        <div className={styles.postListBox} onClick={onClickPost}>
          <img src='https://via.placeholder.com/790x300' alt='본문 이미지' />
          <div className={styles.postListBoxHeader}>
            <img src='https://via.placeholder.com/36' alt='프로필 이미지' />
            <p className={styles.headerNickname}>닉네임</p>
            <p className={styles.headerDetail}>좋아요 21</p>
            <p className={styles.headerDetail}>댓글 4</p>
            <SlOptionsVertical className={styles.headerOption} />
          </div>
          <h2>
            제목은 이렇게 함 근데 이게 길어지면 어떻게 할 지에 대해서 논의를
            해봐야 할 거 같은데 얘도 ... 처리할까
          </h2>
          <p className={styles.postListContent}>
            본문 내용이 매우 길어질 수 있으므로 이곳에 긴 텍스트를 추가하여 ...
            이 부분에서 텍스트가 자동으로 잘리게 됩니다. 추가 내용이
            계속됩니다.본문 내용이 매우 길어질 수 있으므로 이곳에 긴 텍스트를
            추가하여 ... 이 부분에서 텍스트가 자동으로 잘리게 됩니다. 추가
            내용이 계속됩니다.
          </p>
          <p className={styles.postListDetail}>24.08.02</p>
        </div>
      </div>
    </div>
  );
};
export default PostList;
