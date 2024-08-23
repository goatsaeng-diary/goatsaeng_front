import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showAllRecordType } from "../../service/RecordService";
import { showAllCustomRecordType } from "../../service/CustomRecordService";

import styles from "./Record.module.css";
import { LuPlusCircle } from "react-icons/lu";

const RecordList = () => {
  const navigate = useNavigate();
  const [recordType, setRecordType] = useState([]);
  const [customRecordType, setCustomRecordType] = useState([]);

  // 현재 월을 가져오기
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchRecordList();
    fetchCustomRecordList();
  }, []);

  const fetchRecordList = () => {
    showAllRecordType()
      .then((response) => {
        console.log(response);
        setRecordType(response.data);
      })
      .catch((e) => {
        console.log(e);
        window.alert(e.exception.errorMessage);
      });
  };

  const fetchCustomRecordList = () => {
    showAllCustomRecordType()
      .then((response) => {
        console.log(response);
        setCustomRecordType(response.data);
      })
      .catch((e) => {
        console.log(e);
        window.alert(e.exception.errorMessage);
      });
  };

  const onClickItem = (id) => {
    navigate(`/record/${id}`);
  };

  return (
    <div className={styles.container}>
      <h2>{currentMonth} 기록하기</h2>
      {/* 동적으로 월과 연도를 표시 */}
      <div className={styles.list}>
        {recordType.map((record) => (
          <div
            key={record.recordTypeId}
            className={styles.listItem}
            onClick={() => onClickItem(record.recordTypeId)}
          >
            <h2>{record.typeName}</h2>
            <p>
              {currentYear}년 {currentMonth}
            </p>
          </div>
        ))}
        {customRecordType.length > 0 &&
          customRecordType.map((customRecord) => (
            <div
              key={customRecord.customRecordTypeId}
              className={styles.listItem}
              onClick={() => onClickItem(customRecord.customRecordTypeId)}
            >
              <h2>{customRecord.typeName}</h2>
              <p>
                {currentYear}년 {currentMonth}
              </p>
            </div>
          ))}
        <div
          className={styles.listAddItem}
          onClick={() => navigate("/record/new")}
        >
          <LuPlusCircle className={styles.plus} />
        </div>
      </div>
    </div>
  );
};

export default RecordList;
