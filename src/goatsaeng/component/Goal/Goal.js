import React, { useState } from "react";
import styles from "./Goal.module.css";

const Goal = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsData, setDetailsData] = useState(null);
  const [userInput, setUserInput] = useState("");

  const handleSearch = () => {
    setSearchResult({
      weight: "70kg",
      diet: "균형 잡힌 식단",
      time: "1시간 30분",
    });
  };

  const handleShowDetails = () => {
    setDetailsData("칼로리 계산, 단백질 섭취, 예산");
    setShowDetails(true);
  };

  const handleSave = () => {
    console.log("저장된 입력:", userInput);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>이번 갓생 목표는?</h1>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.goalButton} ${
              selectedGoal === "운동" ? styles.active : ""
            }`}
            onClick={() => setSelectedGoal("운동")}
          >
            운동
          </button>
          <button
            className={`${styles.goalButton} ${
              selectedGoal === "공부" ? styles.active : ""
            }`}
            onClick={() => setSelectedGoal("공부")}
          >
            공부
          </button>
        </div>
      </div>

      {selectedGoal === "운동" && (
        <div className={styles.inputContainer}>
          <select className={styles.input}>
            <option value='증량'>증량</option>
            <option value='다이어트'>다이어트</option>
          </select>
          <input className={styles.input} type='text' placeholder='몸무게' />
          <input className={styles.input} type='text' placeholder='시간' />
          <select className={styles.input}>
            <option value='초보'>초보</option>
            <option value='중수'>중수</option>
            <option value='고수'>고수</option>
          </select>
          <button className={styles.searchButton} onClick={handleSearch}>
            검색
          </button>
        </div>
      )}

      {selectedGoal === "운동" && searchResult && (
        <>
          <h2>검색 결과</h2>
          <div className={styles.resultContainer}>
            <p>
              목표에 맞는 식단 계획과 운동 루틴을 구체적으로 설계해드리겠습니다.
              초보자인 경우에는 운동 부하를 점차 증가시켜 부상을 예방하고
              효과적인 근육 증량을 도모하는 것이 중요합니다. 하루 식단 계획
              (목표: 2700칼로리) 아침 (약 700칼로리) 오트밀과 과일: 100g
              오트밀(350칼로리) + 사과 1개(95칼로리) + 우유 200ml(122칼로리) +
              아몬드 10개(133칼로리) 간식 1 (약 200칼로리) 프로틴 쉐이크: 단백질
              파우더 1스쿱(120칼로리) + 물 300ml 점심 (약 800칼로리) 닭가슴살
              그릴: 150g(165칼로리) + 현미밥 150g(248칼로리) + 샐러드(잎채소,
              토마토, 오이, 올리브 오일 드레싱)(387칼로리) 간식 2 (약 200칼로리)
              그릭 요거트: 무지방 그릭 요거트 200g(146칼로리) + 꿀
              1스푼(64칼로리) 저녁 (약 800칼로리) 연어 스테이크: 200g(412칼로리)
              + 구운 야채(당근, 브로콜리, 양파)(150칼로리) + 고구마
              150g(238칼로리) 예산 일일 예산은 약 15,000원에서 20,000원 사이일
              것으로 추정되며, 주간 예산은 약 105,000원에서 140,000원
              정도입니다. 운동 루틴 월요일: 가슴 및 삼두근 벤치 프레스: 4세트
              10회 (40KG) 인클라인 덤벨 프레스: 3세트 12회 (각 12KG) 덤벨
              플라이: 3세트 15회 (각 8KG) 케이블 크로스오버: 3세트 15회 (각
              10KG) 트라이셉스 푸시다운: 4세트 12회 (20KG) 수요일: 등 및 이두근
              데드리프트: 4세트 8회 (50KG) 라트 풀다운: 3세트 12회 (35KG) 바벨
              로우: 3세트 12회 (30KG) 원암 덤벨 로우: 3세트 15회 (각 14KG)
              이두근 바벨 컬: 4세트 12회 (20KG) 금요일: 다리 및 어깨 스쿼트:
              4세트 10회 (50KG) 레그 프레스: 3세트 12회 (100KG) 레그 컬: 3세트
              15회 (30KG) 카프 레이즈: 4세트 20회 (체중) 오버헤드 프레스: 4세트
              10회 (20KG) 이 계획을 따라서 일관되게 실천하면 6개월 안에 목표한
              체중 증량을 달성할 가능성이 높습니다. 운동 시작 시에는 각 운동의
              폼을 정확히 익히고, 필요한 경우 운동 무게를 조정하여 부상을
              방지하십시오.
            </p>
            <button className={styles.detailButton} onClick={handleShowDetails}>
              상세보기
            </button>
          </div>
        </>
      )}

      {selectedGoal === "운동" && showDetails && detailsData && (
        <>
          <h3>상세 정보</h3>
          <div className={styles.detailsContainer}>
            <p>{detailsData}</p>
          </div>
        </>
      )}

      <div className={styles.saveContainer}>
        <input
          className={styles.input}
          type='text'
          placeholder='메모를 입력하세요'
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button className={styles.saveButton} onClick={handleSave}>
          저장하기
        </button>
      </div>
    </div>
  );
};

export default Goal;
