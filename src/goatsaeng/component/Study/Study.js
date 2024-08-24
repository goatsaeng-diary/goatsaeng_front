import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudy } from "../../service/StudyService";
import styles from "./Study.module.css";

const Study = () => {
  const navigate = useNavigate();
  const [study, setStudy] = useState("");
  const [answer, setAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState(""); // 사용자 입력을 위한 상태

  useEffect(() => {
    fetchStudy();
  }, []);

  const fetchStudy = () => {
    getStudy()
      .then((response) => {
        setStudy(response.data.question);
        setAnswer(response.data.answer);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
        window.alert("문제를 불러오는 데 실패했습니다.");
      });
  };

  const handleSubmit = () => {
    if (userAnswer.trim() === answer.trim()) {
      window.alert("정답입니다!");
    } else {
      window.alert("오답입니다. 다시 시도해보세요.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.studyContent}>
        <p className={styles.question}>{study}</p>
        <input
          type='text'
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className={styles.answerInput}
          placeholder='정답을 입력하세요'
        />
        <button onClick={handleSubmit} className={styles.submitButton}>
          제출
        </button>
      </div>
    </div>
  );
};

export default Study;
