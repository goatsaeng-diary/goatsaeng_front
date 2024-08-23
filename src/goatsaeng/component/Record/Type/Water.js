import React, { useState, useEffect } from "react";
import {
  createRecord,
  updateRecord,
  deleteRecord,
  showTodayRecord,
} from "../../../service/RecordService";
import {
  createTarget,
  updatearget,
  showTarget,
} from "../../../service/TargetService";

import styles from "./Type.module.css";
import { FaGlassWater } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const Water = ({ id }) => {
  const [goal, setGoal] = useState("");
  const [cups, setCups] = useState([]);
  const [recordDate, setRecordDate] = useState("");
  const [recordId, setRecordId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [targetId, setTargetId] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setRecordDate(today);
    fetchShowTarget();
    fetchShowTodayRecord();
  }, [id]);

  const fetchShowTarget = () => {
    showTarget(id)
      .then((response) => {
        console.log(response);
        setGoal(response.data.target);
        setTargetId(response.data.targetId);
        setCups(new Array(Math.ceil(response.data.target / 100)).fill(false));
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const fetchShowTodayRecord = () => {
    showTodayRecord(id)
      .then((response) => {
        if (response.data) {
          const { value, recordId } = response.data;
          const parsedValue = JSON.parse(value);
          const amount = parseFloat(
            parsedValue.amount.replace("ml", "").trim()
          );

          setCups((prevCups) => {
            const updatedCups = [...prevCups];
            const filledCups = Math.ceil(amount / 100);
            for (let i = 0; i < filledCups; i++) {
              updatedCups[i] = true;
            }
            return updatedCups;
          });

          setRecordId(recordId);
        }
      })
      .catch((e) => {
        console.error("Failed to fetch today's record:", e);
      });
  };

  const handleGoalChange = (e) => {
    const goalValue = e.target.value;
    const numericGoal = parseFloat(goalValue) || 0; // 문자열을 숫자로 변환
    setGoal(numericGoal);
    setCups(new Array(Math.ceil(numericGoal / 100)).fill(false));
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

  const goalValue = parseFloat(goal) || 0; // 목표를 숫자로 변환

  const handleSubmitTarget = (e) => {
    e.preventDefault();
    const targetForm = {
      target: parseFloat(goal) || 0, // 숫자로 변환
    };
    if (targetId) {
      updatearget(targetId, targetForm)
        .then((response) => {
          window.alert(response.message);
          setIsEditing(false); // 수정 모드 종료
        })
        .catch((e) => {
          console.log(e);
          window.alert(e.exception.errorMessage);
        });
    } else {
      createTarget(targetForm)
        .then((response) => {
          window.alert(response.message);
          setTargetId(response.data.targetId); // 생성된 목표의 ID 저장
          setIsEditing(false); // 수정 모드 종료
        })
        .catch((e) => {
          console.log(e);
          window.alert(e.exception.errorMessage);
        });
    }
  };

  const handleSubmit = (e) => {
    // 기록 저장 또는 수정
    e.preventDefault();

    if (!goal) {
      // 목표가 설정되지 않았으면 경고 메시지 출력
      alert("목표를 먼저 입력해주세요!");
      return;
    }

    const recordForm = {
      date: recordDate,
      value: JSON.stringify({ amount: `${current}ml` }),
    };

    if (recordId) {
      updateRecord(recordId, recordForm)
        .then((response) => {
          window.alert(response.message);
          setIsEditing(false);
        })
        .catch((e) => {
          console.log(e);
          window.alert(e.exception.errorMessage);
        });
    } else {
      createRecord(id, recordForm)
        .then((response) => {
          window.alert(response.message);
          setTargetId(response.data.targetId);
          setRecordId(response.data.recordId);
          setIsEditing(false);
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

  const handleEditClick = () => {
    fetchShowTarget();
    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.container}>
      {/* 목표 설정 영역 */}
      <div className={styles.header}>
        <form className={styles.targetForm} onSubmit={handleSubmitTarget}>
          <div>
            <h2>나의 목표치는?</h2>
            <input
              type="number"
              value={goal}
              onChange={handleGoalChange}
              className={styles.goalInput}
              placeholder="mL"
              disabled={!isEditing}
            />
            <HiOutlinePencilSquare
              className={styles.pencil}
              onClick={handleEditClick}
            />
          </div>
          {isEditing && (
            <button type="submit" className={styles.submitButton}>
              {targetId ? "목표 수정하기" : "목표 저장하기"}
            </button>
          )}
        </form>
      </div>
      <div className={styles.cupContainer}>{cupIcons}</div>
      <div className={styles.footer}>
        <p>
          현재 섭취량: {current} / {goal}mL
        </p>
        <p>달성률: {goalValue ? ((current / goal) * 100).toFixed(1) : 0}%</p>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleSubmit} className={styles.submitButton}>
          {recordId ? "기록 수정하기" : "기록 저장하기"}
        </button>
        {recordId && (
          <button onClick={handleDelete} className={styles.deleteButton}>
            기록 삭제하기
          </button>
        )}
      </div>
    </div>
  );
};

export default Water;
