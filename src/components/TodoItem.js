import "./css/TodoItem.css";
import React, { useContext } from "react";
import { TodoDispatchContext } from "../App";

const TodoItem = ({ id, content, isDone, createDate }) => {
  // 4. createContext 이용해서 props 받아오기
  const { onUpdate, onDelete } = useContext(TodoDispatchContext);
  console.log(`${id} : todoitem`);

  // 2. 체크박스 틱 했을 때 호출 할 함수
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  // 3.삭제 버튼 클릭 시 호출 할 함수 (onDelete를 호출하고 인수로 id 전달해줌)
  const onClickDelete = () => {
    onDelete(id);
  };

  return (
    <div className="TodoItem">
      <div className="checkbox_col">
        <input checked={isDone} onChange={onChangeCheckbox} type="checkbox" />
      </div>
      <div className={`title_col ${isDone ? "done" : ""}`}>{isDone ? `[완료] : ${content}` : content}</div>
      <div className="date_col">{new Date().toLocaleDateString()}</div>
      {/* toLocaleDateString() : 사용자의 로컬, 언어에 맞춰 날짜만 변환 */}
      <div className="btn_col">
        <button onClick={onClickDelete}>삭제</button>
      </div>
    </div>
  );
};

// export default TodoItem;
export default React.memo(TodoItem);
