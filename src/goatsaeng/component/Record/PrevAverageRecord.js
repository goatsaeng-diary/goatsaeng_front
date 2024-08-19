import React, { useEffect, useState } from "react";
import { showRecordAverage } from "../../service/RecordService";
import styles from "./Record.module.css";
import moment from "moment";

const PrevAverageRecord = ({ id }) => {
  const [recordList, setRecordList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchRecordList();
  }, [currentPage]);

  const fetchRecordList = () => {
    showRecordAverage(currentPage, 5)
      .then((response) => {
        const { content, totalPages } = response.data.data;
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

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.dateColumn}>날짜</th>
            <th>평균값</th>
            <th className={styles.achievementColumn}>참여 횟수</th>
          </tr>
        </thead>
        <tbody>
          {recordList.map((record, index) => (
            <tr key={index}>
              <td className={styles.dateColumn}>
                {moment(record.month).format("YYYY.MM")}
              </td>
              <td>{record.averageValue}ml</td>
              <td className={styles.achievementColumn}>
                {record.participationCount}
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

export default PrevAverageRecord;
