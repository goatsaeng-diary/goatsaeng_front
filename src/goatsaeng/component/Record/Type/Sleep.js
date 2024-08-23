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
import { HiOutlinePencilSquare } from "react-icons/hi2";

const Sleep = ({ id }) => {
  const [goal, setGoal] = useState("");
  const [sleepTime, setSleepTime] = useState("");
  const [wakeTime, setWakeTime] = useState("");
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
        setGoal(response.data.target);
        setTargetId(response.data.targetId);
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
          setSleepTime(parsedValue.sleepTime);
          setWakeTime(parsedValue.wakeTime);
          setRecordId(recordId);
        }
      })
      .catch((e) => {
        console.error("Failed to fetch today's record:", e);
      });
  };

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  const handleSleepTimeChange = (e) => {
    setSleepTime(e.target.value);
  };

  const handleWakeTimeChange = (e) => {
    setWakeTime(e.target.value);
  };

  const calculateSleepDuration = () => {
    const sleep = new Date(`1970-01-01T${sleepTime}:00`);
    const wake = new Date(`1970-01-01T${wakeTime}:00`);
    const duration = (wake - sleep) / (1000 * 60 * 60); // 시간 단위로 변환
    return duration >= 0 ? duration : duration + 24; // 마이너스 시간 처리 (밤샘 고려)
  };

  const handleSubmitTarget = (e) => {
    e.preventDefault();
    const targetForm = {
      target: parseFloat(goal) || 0, // 숫자로 변환
    };
    if (targetId) {
      updatearget(targetId, targetForm)
        .then((response) => {
          window.alert(response.message);
          setIsEditing(false);
        })
        .catch((e) => {
          console.log(e);
          window.alert(e.exception.errorMessage);
        });
    } else {
      createTarget(targetForm)
        .then((response) => {
          window.alert(response.message);
          setTargetId(response.data.targetId);
          setIsEditing(false);
        })
        .catch((e) => {
          console.log(e);
          window.alert(e.exception.errorMessage);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!goal) {
      alert("목표를 먼저 입력해주세요!");
      return;
    }

    const duration = calculateSleepDuration();

    const recordForm = {
      date: recordDate,
      value: JSON.stringify({
        sleepTime,
        wakeTime,
        duration: `${duration.toFixed(2)}시간`,
      }),
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
          setSleepTime("");
          setWakeTime("");
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
            <h2>목표 수면 시간은?</h2>
            <input
              type='number'
              value={goal}
              onChange={handleGoalChange}
              className={styles.goalInput}
              placeholder='시간'
              disabled={!isEditing}
            />
            <HiOutlinePencilSquare
              className={styles.pencil}
              onClick={handleEditClick}
            />
          </div>
          {isEditing && (
            <button type='submit' className={styles.submitButton}>
              {targetId ? "목표 수정하기" : "목표 저장하기"}
            </button>
          )}
        </form>
      </div>
      <div className={styles.sleepForm}>
        <h3>수면 시간 기록하기</h3>
        <input
          type='time'
          value={sleepTime}
          onChange={handleSleepTimeChange}
          className={styles.timeInput}
        />
        <input
          type='time'
          value={wakeTime}
          onChange={handleWakeTimeChange}
          className={styles.timeInput}
        />
      </div>
      <div className={styles.footer}>
        <p>
          수면 시간: {calculateSleepDuration().toFixed(2)} / {goal}시간
        </p>
        <p>
          달성률:{" "}
          {goal ? ((calculateSleepDuration() / goal) * 100).toFixed(1) : 0}%
        </p>
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

export default Sleep;
