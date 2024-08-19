import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createReplyComment } from "../../../service/ReplyService";
import styles from "./Comment.module.css";

const ReplyCreate = ({ parentCommentId }) => {
  const [replyCommentContent, setReplyCommentContent] = useState(""); // 상태 변수로 댓글 내용 저장

  const handleCommentChange = (e) => {
    setReplyCommentContent(e.target.value); // 상태 변수 업데이트
  };
  // 댓글 작성하기
  const handleCommentSubmit = () => {
    if (replyCommentContent.trim() === "") {
      window.alert("댓글 내용을 입력하세요.");
      return;
    }
    createReplyComment(parentCommentId, { content: replyCommentContent }) // 댓글 내용 전달
      .then((response) => {
        window.alert(response.message);
      })
      .catch((e) => {
        console.log(e);
        // window.alert(e.exception.errorMessage);
      });
  };

  return (
    <div className={styles.replyCreateContainer}>
      <div className={styles.replyCreate}>
        <div className={styles.inputWrapper}>
          <input
            placeholder='댓글을 입력하세요.'
            value={replyCommentContent}
            onChange={handleCommentChange}
          />
          <button onClick={handleCommentSubmit}>등록</button>
        </div>
      </div>
    </div>
  );
};

export default ReplyCreate;
