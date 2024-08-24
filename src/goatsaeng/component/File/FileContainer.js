import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFile, getList } from "../../service/FileService";

import styles from "./File.module.css";
import FileSearch from "./FileSearch";

const FileContainer = () => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);

  useEffect(() => {
    fetchFileList();
  }, []);

  const fetchFileList = () => {
    getList()
      .then((response) => {
        setFiles(response.data);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
        window.alert("파일 목록을 불러오는 데 실패했습니다.");
      });
  };

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleFileUpload = () => {
    if (selectedFiles && selectedFiles.length > 0) {
      uploadFile(Array.from(selectedFiles))
        .then((response) => {
          window.alert("파일이 성공적으로 업로드되었습니다.");
          console.log(response);
          fetchFileList();
        })
        .catch((e) => {
          console.log(e);
          window.alert("파일 업로드에 실패했습니다.");
        });
    } else {
      window.alert("업로드할 파일을 선택해주세요.");
    }
  };

  return (
    <div className={styles.FileContainer}>
      <h2>파일 업로드</h2>
      <div className={styles.header}>
        <input type='file' multiple onChange={handleFileChange} />
        <button onClick={handleFileUpload}>업로드</button>
      </div>
      <h2>파일 목록</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
      <FileSearch />
    </div>
  );
};

export default FileContainer;
