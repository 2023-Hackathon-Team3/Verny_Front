import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ArtPage from "./pages/ArtPage";
import ArtDetailPage from "./pages/ArtDetailPage";
import PlacePage from "./pages/PlacePage";
import PlaceDetailPage from "./pages/PlaceDetailPage";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <Router>
      <Routes>
        {/*로그인 및 회원가입*/}
        <Route exact path="/" element={<StartPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/*메인 화면*/}
        <Route path="/main" element={<ArtPage />} />
        <Route path="/place" element={<PlacePage />} />
        <Route path="/mypage" element={<MyPage />} />
        {/*세부 화면*/}
      </Routes>
    </Router>
  );
}

export default App;
