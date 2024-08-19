import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createReplyComment,
  updateReplyComment,
  deleteReplyComment,
  showReplyComment,
} from "../../../service/ReplyService";
import styles from "./Comment.module.css";

const ReplyList = ({ parentCommentId }) => {
  const navigate = useNavigate();
  const [replyCommentList, setReplyCommentList] = useState([]);
  const [replyCommentContent, setReplyCommentContent] = useState(""); // 상태 변수로 댓글 내용 저장

  useEffect(() => {
    fetchReplyCommentList();
  }, []);

  const handleCommentChange = (e) => {
    setReplyCommentContent(e.target.value); // 상태 변수 업데이트
  };

  // 댓글 보여주기
  const fetchReplyCommentList = () => {
    showReplyComment(parentCommentId)
      .then((response) => {
        setReplyCommentList(response.data);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
        // window.alert(e.exception.errorMessage);
      });
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
        setReplyCommentList(""); // 댓글 작성 후 내용 초기화
        fetchReplyCommentList();
      })
      .catch((e) => {
        console.log(e);
        // window.alert(e.exception.errorMessage);
      });
  };

  // 댓글 삭제하기
  const onClickCommentDelete = (replyId) => {
    deleteReplyComment(replyId)
      .then((response) => {
        window.alert(response.message);
        fetchReplyCommentList();
      })
      .catch((e) => {
        console.log(e);
        // window.alert(e.exception.errorMessage);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.commentList}>
        {replyCommentList.length > 0 ? (
          replyCommentList.map((replyComment) => (
            <div key={replyComment.replyId} className={styles.commentItem}>
              <div className={styles.itemBox}>
                <img src='https://via.placeholder.com/36' alt='프로필 이미지' />
                <p className={styles.itemNickname}>{replyComment.nickname}</p>
                <button
                  onClick={() => onClickCommentDelete(replyComment.replyId)}
                >
                  삭제
                </button>
              </div>
              <div className={styles.itemBox2}>
                <p className={styles.itemContent}>{replyComment.content}</p>
                <p className={styles.itemCreatedDate}>
                  {replyComment.createdDate}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>댓글이 없습니다.</p>
        )}
        <div className={styles.commentCreate}>
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

export default ReplyList;
