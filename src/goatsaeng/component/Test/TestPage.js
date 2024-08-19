// TestPage.js
export const getTestPostData = () => {
  return [
    {
      id: 1,
      title: "테스트 제목",
      content:
        "이것은 테스트 본문입니다. 이 본문은 테스트를 위해 작성되었습니다.",
      createdDate: "2024-08-11",
      likeCount: 21,
      commentCount: 2,
      nickname: "테스트닉네임",
      profileImage: "https://via.placeholder.com/36",
      postImage: "https://via.placeholder.com/808x500",
    },
  ];
};

export default getTestPostData;
