import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../service/PostService";

import styles from "./Post.module.css";

const PostCreate = () => {
  const navigate = useNavigate();
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
  });

  const handlePostFormChange = (e) => {
    const changedField = e.target.name;
    setPostForm({
      ...postForm,
      [changedField]: e.target.value,
    });
  };

  const handlePostFormSubmit = (e) => {
    e.preventDefault();
    createPost(postForm)
      .then((response) => {
        window.alert(response.message);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        window.alert(e.exception.errorMessage);
      });
  };

  const onClickCancelButton = (e) => {
    if (window.confirm("게시글 작성을 취소하시겠습니까?")) {
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.createBox} onSubmit={handlePostFormSubmit}>
        <input
          className={styles.createBoxTitle}
          placeholder='제목을 입력하세요.'
          id='title'
          type='text'
          name='title'
          value={postForm.title}
          required
          onChange={handlePostFormChange}
        ></input>
        <input className={styles.createBoxFile} type='file'></input>
        <textarea
          className={styles.createBoxContent}
          placeholder='내용을 입력하세요.'
          id='content'
          type='text'
          name='content'
          value={postForm.content}
          onChange={handlePostFormChange}
          required
        ></textarea>
        <div className={styles.createButtonBox}>
          <button
            className={styles.postCancelButton}
            onClick={onClickCancelButton}
          >
            취소
          </button>
          <button className={styles.postButton} type='submit'>
            등록
          </button>
        </div>
      </form>
    </div>
  );
};
export default PostCreate;
