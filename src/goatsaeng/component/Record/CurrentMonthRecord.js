import React, { useEffect, useState } from "react";
import { showRecordMonth } from "../../service/RecordService";
import styles from "./Record.module.css";

const CurrentMonthRecord = ({ id }) => {
  const [recordList, setRecordList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const goalAmount = 1000; // 목표치 설정

  useEffect(() => {
    fetchRecordList();
  }, [currentPage]);

  const fetchRecordList = () => {
    showRecordMonth(currentPage, 5)
      .then((response) => {
        const { content, totalPages } = response.data;
        setRecordList(content);
        setTotalPages(totalPages);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
        window.alert("기록을 불러오는 데 실패했습니다. 다시 시도해주세요.");
      });
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const parseAmount = (value) => {
    try {
      const jsonValue = JSON.parse(value);
      return parseFloat(jsonValue.amount.replace("ml", "").trim());
    } catch (e) {
      return 0;
    }
  };

  const totalRecordedAmount = recordList.reduce(
    (sum, record) => sum + parseAmount(record.value),
    0
  );

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.dateColumn}>날짜</th>
            <th>기록 내용</th>
            <th className={styles.achievementColumn}>달성률</th>
          </tr>
        </thead>
        <tbody>
          {recordList.map((record) => (
            <tr key={record.recordId}>
              <td className={styles.dateColumn}>{record.date}</td>
              <td>{parseAmount(record.value)}ml</td>
              <td className={styles.achievementColumn}>
                {((parseAmount(record.value) / goalAmount) * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className={styles.pageButton}
        >
          이전
        </button>
        <span className={styles.pageInfo}>
          {currentPage + 1} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          className={styles.pageButton}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default CurrentMonthRecord;
