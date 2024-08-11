import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./goatsaeng/context/AuthContext";
import styles from "./App.module.css";
//Protected Route
import ProtectedRoute from "./goatsaeng/component/ProtectedRoute";
//Layouts
import MainLayout from "./goatsaeng/component/Layout/MainLayout";
import SubLayout from "./goatsaeng/component/Layout/SubLayout";
import AuthLayout from "./goatsaeng/component/Layout/AuthLayout";
//Auth
import Login from "./goatsaeng/component/Auth/Login";
import SignUp from "./goatsaeng/component/Auth/SignUp";
//Post
import PostList from "./goatsaeng/component/Post/PostList";
import PostCreate from "./goatsaeng/component/Post/PostCreate";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className={styles.page}>
          <Routes>
            {/* 로그인 여부 판별 X - 레이아웃 (로그인, 회원가입 페이지) */}
            <Route
              path='/login'
              element={
                <AuthLayout>
                  <Login />
                </AuthLayout>
              }
            />
            <Route
              path='/signup'
              element={
                <AuthLayout>
                  <SignUp />
                </AuthLayout>
              }
            />
            {/* 로그인 여부 판별 O - 보호된 라우트 */}
            <Route
              path='/'
              element={
                <MainLayout>
                  <ProtectedRoute element={<PostList />} />
                </MainLayout>
              }
            />
            <Route
              path='/postwrite'
              element={
                <SubLayout>
                  <ProtectedRoute element={<PostCreate />} />
                </SubLayout>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
