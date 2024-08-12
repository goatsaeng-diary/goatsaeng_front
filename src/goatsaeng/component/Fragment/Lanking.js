import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Fragment.module.css";
import { PiCrownSimpleFill } from "react-icons/pi";

const Lanking = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.lanking}>
      <h3 className={styles.lankingLabe1}>월간 포인트 순위</h3>
      <div className={styles.lankingContainer}>
        <PiCrownSimpleFill className={styles.firstCrown} />
        <p>1등</p>
        <img src='https://via.placeholder.com/36' alt='프로필 이미지' />
        <p>김도영</p>
      </div>
      <div className={styles.lankingContainer}>
        <PiCrownSimpleFill className={styles.secondCrown} />
        <p>2등</p>
        <img src='https://via.placeholder.com/36' alt='프로필 이미지' />
        <p>정재현</p>
      </div>
      <div className={styles.lankingContainer}>
        <PiCrownSimpleFill className={styles.thirdCrown} />
        <p>3등</p>
        <img src='https://via.placeholder.com/36' alt='프로필 이미지' />
        <p>김정우</p>
      </div>
      <h3 className={styles.lankingLabel2}>일간 포인트 순위</h3>
      <div className={styles.lankingContainer}>
        <PiCrownSimpleFill className={styles.firstCrown} />
        <p>1등</p>
        <img src='https://via.placeholder.com/36' alt='프로필 이미지' />
        <p>길이가길면이렇게</p>
      </div>
      <div className={styles.lankingContainer}>
        <PiCrownSimpleFill className={styles.secondCrown} />
        <p>2등</p>
        <img src='https://via.placeholder.com/36' alt='프로필 이미지' />
        <p>으로처리함</p>
      </div>
      <div className={styles.lankingContainer}>
        <PiCrownSimpleFill className={styles.thirdCrown} />
        <p>3등</p>
        <img src='https://via.placeholder.com/36' alt='프로필 이미지' />
        <p>괜찮은듯</p>
      </div>
      <button>+ 더보기</button>
    </div>
  );
};

export default Lanking;
