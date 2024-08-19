import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createComment,
  deleteComment,
  showComment,
  updateComment,
} from "../../../service/CommentService";
import Moment from "moment";
import ReplyList from "./ReplyList";
import ReplyCreate from "./ReplyCreate";

import styles from "./Comment.module.css";
import { SlOptionsVertical } from "react-icons/sl";

const CommentList = ({ planId }) => {
  const navigate = useNavigate();
  const [commentId, setCommentId] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  //옵션 버튼 처리
  const [openDropdown, setOpenDropdown] = useState({});

  //댓글 관련 오류 메시지
  const [errorMessage, setErrorMessage] = useState("");

  //댓글 수정
  const [isEditing, setIsEditing] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchCommentList();
  }, []);

  // 댓글 목록 가져오기
  const fetchCommentList = () => {
    showComment(planId)
      .then((response) => {
        setCommentList(response.data);
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage(e.exception.errorMessage);
      });
  };

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  // 댓글 작성하기
  const onClickCreate = () => {
    if (commentContent.trim() === "") {
      window.alert("댓글 내용을 입력하세요.");
      return;
    }
    createComment(planId, { content: commentContent }) //댓글 내용 전달
      .then((response) => {
        window.alert(response.message);
        setCommentContent(""); //댓글 작성 후 내용 초기화
        fetchCommentList();
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage(e.exception.errorMessage);
      });
  };

  // 댓글 수정하기
  const onClickCommentUpdate = (commentId) => {
    if (editContent.trim() === "") {
      window.alert("댓글 내용을 입력하세요.");
      return;
    }
    updateComment(commentId, { content: editContent }) //수정된 댓글 내용 전달
      .then((response) => {
        window.alert(response.message);
        setIsEditing(null);
        fetchCommentList();
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage(e.exception.errorMessage);
      });
  };

  // 댓글 삭제하기
  const onClickCommentDelete = (commentId) => {
    deleteComment(commentId)
      .then((response) => {
        window.alert(response.message);
        fetchCommentList();
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage(e.exception.errorMessage);
      });
  };

  const onClickCancel = () => {
    if (window.confirm("댓글 수정을 취소하겠습니까? ")) {
      setIsEditing(null);
      setEditContent("");
    }
  };

  //옵션 버튼 누르는 경우
  const onClickOption = (commentId) => {
    setOpenDropdown((prevShowOptions) => ({
      ...prevShowOptions,
      [commentId]: !prevShowOptions[commentId],
    }));
  };

  // 댓글 수정 모드 활성화
  const onClickEdit = (commentId, content) => {
    setIsEditing(commentId);
    setEditContent(content);
  };

  //답글
  const onClickCommentId = (commentId) => {
    setCommentId(commentId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.commentList}>
        {commentList.length > 0 ? (
          commentList.map((comment) => (
            <div key={comment.commentId} className={styles.commentItem}>
              <div className={styles.itemBox}>
                <img src='https://via.placeholder.com/36' alt='프로필 이미지' />
                <p className={styles.itemNickname}>{comment.username}</p>
                <SlOptionsVertical
                  className={styles.headerOption}
                  onClick={() => onClickOption(comment.commentId)}
                />
                {openDropdown[comment.commentId] && (
                  <div className={styles.optionMenu}>
                    <button
                      className={styles.optionItem}
                      onClick={() => onClickCommentId(comment.commentId)}
                    >
                      답글
                    </button>
                    <button
                      className={styles.optionItem}
                      onClick={() =>
                        onClickEdit(comment.commentId, comment.content)
                      }
                    >
                      수정
                    </button>
                    <button
                      className={styles.optionItem}
                      onClick={() => onClickCommentDelete(comment.commentId)}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.itemBox2}>
                {isEditing === comment.commentId ? (
                  <div className={styles.commentCreate}>
                    <div className={styles.commmentEdit}>
                      <input
                        type='text'
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                      />
                      <button onClick={onClickCancel}>취소</button>
                      <button
                        onClick={() => onClickCommentUpdate(comment.commentId)}
                      >
                        등록
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className={styles.itemContent}>{comment.content}</p>
                    <p className={styles.itemCreatedDate}>
                      {Moment(comment.createdDate).format(
                        "YYYY.MM.DD A hh:mm "
                      )}
                    </p>
                  </>
                )}
              </div>
              {/* 댓글에 대한 답글 렌더링 */}
              <div className={styles.replyList}>
                <ReplyList parentCommentId={comment.commentId} />
              </div>
              {/* 대댓글 작성하기 */}
              {commentId === comment.commentId && (
                <ReplyCreate parentCommentId={comment.commentId} />
              )}
            </div>
          ))
        ) : (
          <p className={styles.noComment}>{errorMessage}</p>
        )}
        <div className={styles.commentCreate}>
          <div className={styles.inputWrapper}>
            <input
              placeholder='댓글을 입력하세요.'
              value={commentContent}
              onChange={handleCommentChange}
            />
            <button onClick={onClickCreate}>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
