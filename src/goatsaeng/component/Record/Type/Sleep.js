import React, { useState } from "react";
import styles from "./Type.module.css";

const Sleep = () => {
  const [goal, setGoal] = useState(""); // 목표 수면 시간
  const [wakeUpTime, setWakeUpTime] = useState(""); // 기상 시간
  const [bedTime, setBedTime] = useState(""); // 취침 시간
  const [sleepDuration, setSleepDuration] = useState(""); // 수면 시간
  const [isGoalMet, setIsGoalMet] = useState(""); // 목표 달성 여부

  // 목표 수면 시간 입력 처리
  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  // 취침 시간 입력 처리
  const handleBedTimeChange = (e) => {
    setBedTime(e.target.value);
    // 취침 시간만 입력하면 기상 시간 입력이 되어야 수면 시간 계산 가능하므로
    // 기상 시간 입력에 대한 상태 업데이트도 고려합니다.
  };

  // 기상 시간 입력 처리
  const handleWakeUpTimeChange = (e) => {
    const wakeUp = e.target.value;
    setWakeUpTime(wakeUp);
    calculateSleepDuration(wakeUp, bedTime);
  };

  // 수면 시간 계산
  const calculateSleepDuration = (wakeUp, bedTime) => {
    if (wakeUp && bedTime) {
      const wakeUpDate = new Date(`1970-01-01T${wakeUp}`);
      const bedTimeDate = new Date(`1970-01-01T${bedTime}`);

      let duration = wakeUpDate - bedTimeDate;

      // 수면 시간이 음수일 경우 하루를 더해야 하는 경우
      if (duration < 0) {
        duration += 24 * 60 * 60 * 1000; // 하루를 밀리초로
      }

      const hours = Math.floor(duration / (1000 * 60 * 60));
      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

      setSleepDuration(`${hours}시간 ${minutes}분`);

      // 목표 달성 여부 계산
      const totalMinutes = hours * 60 + minutes;
      const goalMinutes = parseInt(goal) * 60;
      setIsGoalMet(totalMinutes >= goalMinutes ? "O" : "X");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>목표 수면 시간</h2>
        <input
          type='number'
          value={goal}
          onChange={handleGoalChange}
          placeholder='8'
          className={styles.goalInput}
        />
        <h3>시간</h3>
      </div>
      <div className={styles.timeInputs}>
        <label>
          취침 시간:
          <input
            type='time'
            value={bedTime}
            onChange={handleBedTimeChange}
            className={styles.timeInput}
          />
        </label>
        <label>
          기상 시간:
          <input
            type='time'
            value={wakeUpTime}
            onChange={handleWakeUpTimeChange}
            className={styles.timeInput}
          />
        </label>
      </div>
      <div className={styles.result}>
        <p>수면 시간: {sleepDuration}</p>
        <p>목표 달성 여부: {isGoalMet}</p>
      </div>
    </div>
  );
};

export default Sleep;
