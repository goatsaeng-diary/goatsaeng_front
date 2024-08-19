import React, { useState, useEffect } from "react";
import {
  createRecord,
  updateRecord,
  deleteRecord,
  showTodayRecord,
} from "../../../service/RecordService";

import styles from "./Type.module.css";
import { FaGlassWater } from "react-icons/fa6";

const Water = ({ id }) => {
  const [goal, setGoal] = useState("");
  const [cups, setCups] = useState([]);
  const [recordDate, setRecordDate] = useState("");
  const [recordId, setRecordId] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setRecordDate(today);

    showTodayRecord()
      .then((response) => {
        const { date, value, recordId } = response.data;
        const parsedValue = JSON.parse(value);
        const amount = parseFloat(parsedValue.amount.replace("ml", "").trim());

        setGoal(amount);
        setCups(new Array(Math.ceil(amount / 100)).fill(true));
        setRecordId(recordId);
      })
      .catch((e) => {
        console.log(e);
        const today = new Date().toISOString().split("T")[0];
        setRecordDate(today);
      });
  }, []);

  const handleGoalChange = (e) => {
    const goalValue = e.target.value;
    setGoal(goalValue);
    setCups(new Array(Math.ceil(goalValue / 100)).fill(false));
  };

  const handleCupClick = (index) => {
    const newCups = [...cups];
    newCups[index] = !newCups[index];
    setCups(newCups);
  };

  const current = cups.filter(Boolean).length * 100;

  const cupIcons = cups.map((filled, index) => (
    <FaGlassWater
      key={index}
      className={filled ? styles.filled : styles.empty}
      onClick={() => handleCupClick(index)}
    />
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recordDate) {
      alert("날짜를 선택해주세요.");
      return;
    }
    const recordForm = {
      date: recordDate,
      value: JSON.stringify({ amount: `${current}ml` }),
    };

    if (recordId) {
      // 기존 기록이 있으면 업데이트
      updateRecord(recordId, recordForm)
        .then((response) => {
          window.alert(response.message);
        })
        .catch((e) => {
          console.log(e);
          window.alert(e.exception.errorMessage);
        });
    } else {
      // 기존 기록이 없으면 새로 생성
      createRecord(id, recordForm)
        .then((response) => {
          window.alert(response.message);
        })
        .catch((e) => {
          console.log(e);
          window.alert(e.exception.errorMessage);
        });
    }
  };

  const handleDelete = () => {
    if (recordId) {
      deleteRecord(recordId)
        .then((response) => {
          window.alert(response.message);
          setGoal("");
          setCups([]);
          setRecordId(null);
        })
        .catch((e) => {
          console.log(e);
          window.alert(e.exception.errorMessage);
        });
    } else {
      window.alert("삭제할 기록이 없습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>나의 목표치는?</h3>
        <input
          type='number'
          value={goal}
          onChange={handleGoalChange}
          className={styles.goalInput}
          placeholder='목표량을 입력하세요 (mL)'
        />
      </div>
      <div className={styles.dateContainer}>
        <input
          type='date'
          value={recordDate}
          readOnly
          className={styles.dateInput}
        />
      </div>
      <div className={styles.cupContainer}>{cupIcons}</div>
      <div className={styles.footer}>
        <p>
          현재 섭취량: {current} / {goal}mL
        </p>
        <p>달성률: {goal ? ((current / goal) * 100).toFixed(1) : 0}%</p>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleSubmit} className={styles.submitButton}>
          {recordId ? "수정하기" : "저장하기"}
        </button>
        {recordId && (
          <button onClick={handleDelete} className={styles.submitButton}>
            삭제하기
          </button>
        )}
      </div>
    </div>
  );
};

export default Water;
