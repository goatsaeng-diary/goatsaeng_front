import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import styles from "./App.module.css";

import Login from "./goatsaeng/component/auth/Login";
import SignUp from "./goatsaeng/component/auth/SignUp";

import Header from "./goatsaeng/component/side/Header";

import PostList from "./goatsaeng/component/post/PostList";

function App() {
  const location = useLocation();

  // 로그인과 회원가입 페이지에서는 헤더를 렌더링하지 않음
  const hideHeaderPaths = ["/login", "/signup"];
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader ? (
        <div className={styles.page}>
          <Header />
          <div className={styles.content}>
            <Routes>
              <Route path='/' element={<PostList />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className={styles.authPage}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </div>
      )}
    </>
  );
}
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
export default AppWrapper;
