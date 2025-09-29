import "./css/Header.css";

const Header = () => {
  return (
    <div className="Header">
      <h3>오늘 날짜는 📅</h3>
      <h1>{new Date().toDateString()}</h1>
      {/* toDateString() : 영어권 스타일의 읽기 쉬운 날짜 문자열 */}
    </div>
  );
};

export default Header;
