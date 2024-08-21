import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constant/backendAPI";

function OAuth2RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const error = params.get("error");

    if (error) {
      console.error("OAuth2 로그인 에러: ", decodeURIComponent(error));
      alert(decodeURIComponent(error));
      navigate("/login");
      return;
    }

    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      navigate("/");
    } else {
      console.error("토큰 정보가 없습니다.");
      alert("로그인 정보가 올바르지 않습니다. 다시 시도해 주세요.");
      navigate("/login");
    }
  }, [location, navigate]);

  return <div>OAuth2 로그인 처리 중...</div>;
}

export default OAuth2RedirectHandler;
