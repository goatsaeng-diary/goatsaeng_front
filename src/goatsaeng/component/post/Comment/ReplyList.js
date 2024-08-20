import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createReplyComment,
  updateReplyComment,
  deleteReplyComment,
  showReplyComment,
} from "../../../service/ReplyService";
import Moment from "moment";
import styles from "./Comment.module.css";
import { TbChevronDownLeft } from "react-icons/tb";
import { SlOptionsVertical } from "react-icons/sl";
import ReplyCreate from "./ReplyCreate";

const ReplyList = ({ parentCommentId }) => {
  const navigate = useNavigate();
  const [replyCommentList, setReplyCommentList] = useState([]);
  const [replyCommentContent, setReplyCommentContent] = useState(""); // 상태 변수로 댓글 내용 저장

  //옵션 버튼 처리
  const [openDropdown, setOpenDropdown] = useState({});
  //댓글 관련 오류 메시지
  const [errorMessage, setErrorMessage] = useState("");

  //댓글 수정
  const [isEditing, setIsEditing] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchReplyCommentList();
  }, []);

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

  // 댓글 수정하기
  const onClickCommentUpdate = (replyId) => {
    if (editContent.trim() === "") {
      window.alert("댓글 내용을 입력하세요.");
      return;
    }
    updateReplyComment(replyId, { content: editContent }) //수정된 댓글 내용 전달
      .then((response) => {
        window.alert(response.message);
        setIsEditing(null);
        fetchReplyCommentList();
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage(e.exception.errorMessage);
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
  const onClickOption = (replyId) => {
    setOpenDropdown((prevShowOptions) => ({
      ...prevShowOptions,
      [replyId]: !prevShowOptions[replyId],
    }));
  };

  // 댓글 수정 모드 활성화
  const onClickEdit = (replyId, content) => {
    setIsEditing(replyId);
    setEditContent(content);
  };

  return (
    <div className={styles.replyContainer}>
      <TbChevronDownLeft className={styles.elbow} />
      <div className={styles.replyList}>
        {replyCommentList.length > 0
          ? replyCommentList.map((replyComment) => (
              <div key={replyComment.replyId} className={styles.commentItem}>
                <div className={styles.itemBox}>
                  <img
                    src='https://via.placeholder.com/36'
                    alt='프로필 이미지'
                  />
                  <p className={styles.itemNickname}>{replyComment.username}</p>
                  <SlOptionsVertical
                    className={styles.headerOption}
                    onClick={() => onClickOption(replyComment.replyId)}
                  />
                  {openDropdown[replyComment.replyId] && (
                    <div className={styles.optionMenu}>
                      <button
                        className={styles.optionItem}
                        onClick={() =>
                          onClickEdit(
                            replyComment.replyId,
                            replyComment.content
                          )
                        }
                      >
                        수정
                      </button>
                      <button
                        className={styles.optionItem}
                        onClick={() =>
                          onClickCommentDelete(replyComment.replyId)
                        }
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
                <div className={styles.itemBox2}>
                  {isEditing === replyComment.replyId ? (
                    <div className={styles.commentCreate}>
                      <div className={styles.commmentEdit}>
                        <input
                          type='text'
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                        />
                        <button onClick={onClickCancel}>취소</button>
                        <button
                          onClick={() =>
                            onClickCommentUpdate(replyComment.replyId)
                          }
                        >
                          등록
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className={styles.itemContent}>
                        {replyComment.content}
                      </p>
                      <p className={styles.itemCreatedDate}>
                        {Moment(replyComment.createdDate).format(
                          "YYYY.MM.DD A hh:mm "
                        )}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default ReplyList;
