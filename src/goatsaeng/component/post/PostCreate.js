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
  const [files, setFiles] = useState([]);

  const handlePostFormChange = (e) => {
    const changedField = e.target.name;
    setPostForm({
      ...postForm,
      [changedField]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handlePostFormSubmit = (e) => {
    e.preventDefault();
    // FormData 객체 생성
    const formData = new FormData();
    formData.append("title", postForm.title);
    formData.append("content", postForm.content);

    // 선택한 파일들을 FormData에 추가
    files.forEach((file, index) => {
      formData.append("files", file); // 서버가 이 키("files")를 통해 파일 배열을 받도록 설계
    });

    // createPost 함수에 postForm과 files를 직접 전달
    createPost(postForm, files)
      .then((response) => {
        window.alert(response.message);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response?.data?.exception?.errorMessage);
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
        />
        <input
          className={styles.createBoxFile}
          type='file'
          multiple
          onChange={handleFileChange}
        />
        <textarea
          className={styles.createBoxContent}
          placeholder='내용을 입력하세요.'
          id='content'
          type='text'
          name='content'
          value={postForm.content}
          onChange={handlePostFormChange}
          required
        />
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
