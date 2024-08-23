import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Fragment.module.css";
import { FaPlusCircle } from "react-icons/fa";

const Option = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState); // Toggle state
  };

  const onClickCreate = () => {
    navigate(`/postwrite`);
  };

  return (
    <div className={styles.optionContainer}>
      <div className={styles.option} onClick={toggleMenu}>
        <FaPlusCircle />
      </div>
      {isOpen && (
        <div className={styles.menu}>
          <button className={styles.menuItem} onClick={onClickCreate}>
            글쓰기
          </button>
        </div>
      )}
    </div>
  );
};

export default Option;
