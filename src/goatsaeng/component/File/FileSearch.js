import React, { useState } from "react";
import { searchContent } from "../../service/FileService";
import styles from "./File.module.css";

const FileSearch = () => {
  const [content, setContent] = useState([]);
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMessage = { text: input, isUser: true };
    setContent((prev) => [...prev, newUserMessage]);
    setInput("");

    searchContent(input)
      .then((response) => {
        console.log(response);
        const aiResponse = response.data.response;
        setMessage(aiResponse);
        const newAIMessage = { text: aiResponse, isUser: false };
        setContent((prev) => [...prev, newAIMessage]);
      })
      .catch((error) => {
        console.error("검색 실패", error);
        const errorMessage = { text: "검색에 실패했습니다.", isUser: false };
        setContent((prev) => [...prev, errorMessage]);
      });
  };

  return (
    <div className={styles.container}>
      <h2>질문하기</h2>
      <div className={styles.searchContainer}>
        {content.map((message, index) => (
          <div
            key={index}
            className={message.isUser ? styles.userMessage : styles.aiMessage}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className={styles.inputContainer}>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='질문을 입력하세요...'
          className={styles.input}
        />
        <button type='submit' className={styles.button}>
          전송
        </button>
      </form>
    </div>
  );
};

export default FileSearch;
