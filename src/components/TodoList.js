import "./css/TodoList.css";
import TodoItem from "./TodoItem";

const TodoList = ({ todo }) => {
  return (
    <div className="TodoList">
      <h4>Todo List 🌱</h4>
      <input className="searchbar" placeholder="검색어를 입력하세요" />
      <div className="list_wrapper">
        {/* TodoItem을 반복해서 값 찍어주기 (배열 데이터를 렌더링할 때는 배열 메서드 map을 주로 이용)
        HTML 으로 찍을 수도 있고 <div>{it.content}</div>, 컴포넌트로 반환 할 수도 있다
        it = {id, isDone, content, createDate} .. 을 의미 -> props로 넘겨주기
        아이템마다 가지고 있는 고유 key 값이 필요함 = 미리 만들어 뒀던 id 값으로 이용*/}
        {todo.map((it) => (
          <TodoItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
