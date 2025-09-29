import "./css/TodoItem.css";

const TodoItem = ({ id, content, isDone, createDate, onUpdate }) => {
  // 체크박스 틱 했을 때 호출 할 함수
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  return (
    <div className="TodoItem">
      <div className="checkbox_col">
        <input checked={isDone} onChange={onChangeCheckbox} type="checkbox" />
      </div>
      <div className="title_col">{content}</div>
      <div className="date_col">{new Date().toLocaleDateString()}</div>
      {/* toLocaleDateString() : 사용자의 로컬, 언어에 맞춰 날짜만 변환 */}
      <div className="btn_col">
        <button>삭제</button>
      </div>
    </div>
  );
};

export default TodoItem;
