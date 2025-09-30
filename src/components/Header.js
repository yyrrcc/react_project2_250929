import "./css/Header.css";
import React from "react";

// 이 컴포넌트는 어떤 상황에서도 리렌더할 필요가 없음
// React.memo는 컴포넌트가 모든 상황에서 리렌더되지 않도록 강화함으로써 서비스를 최적화하는 도구
const Header = () => {
  return (
    <div className="Header">
      <h3>오늘 날짜는 📅</h3>
      <h1>{new Date().toDateString()}</h1>
      {/* toDateString() : 영어권 스타일의 읽기 쉬운 날짜 문자열 */}
    </div>
  );
};

export default React.memo(Header);
