import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Record.module.css";
import { FaArrowLeft } from "react-icons/fa";
import Water from "./Type/Water";
import Sleep from "./Type/Sleep";
import CurrentMonthRecord from "./CurrentMonthRecord";
import PrevAverageRecord from "./PrevAverageRecord";

const RecordPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // 현재 월을 가져오기
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  const onClickGoBack = () => {
    navigate(-1);
  };

  const renderRecordComponent = () => {
    switch (id) {
      case "1":
        return <Water id={id} />;
      case "2":
        return "운동기록";
      case "3":
        return <Sleep />;
      case "4":
        return "공부기록";
      default:
        return <div>잘못된 요청입니다.</div>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.recordList}>
        <FaArrowLeft className={styles.goBack} onClick={onClickGoBack} />
        <h2>
          {id === "1" && "오늘의 물 섭취량"}
          {id === "3" && "오늘의 수면 시간"}
        </h2>
        {renderRecordComponent()}
        <h3>{currentMonth} 기록</h3>
        <CurrentMonthRecord id={id} />
        <h3>이전 기록</h3>
        <PrevAverageRecord id={id} />
      </div>
    </div>
  );
};

export default RecordPage;
