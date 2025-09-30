import "./css/TodoList.css";
import { useMemo, useState } from "react";
import TodoItem from "./TodoItem";

// 2. TodoItem에게 props를 전달하기 위해서 List에다가도 넘겨주기
const TodoList = ({ todo, onUpdate, onDelete }) => {
  // 0. 검색 기능 만들기 위해 useState 훅, onChange 함수 이용하기
  const [search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  // 1. 검색어 필터링 함수
  // 2. 대소문자 구별하지 않게 하기 위해 .toLowerCase() 메서드 추가
  const getSearchResult = () => {
    return search === "" ? todo : todo.filter((it) => it.content.toLowerCase().includes(search.toLocaleLowerCase()));
  };

  // 3. 할 일 분석 기능 함수 추가 (총 할일 개수, 완료된 일, 완료되지 못한 일) + useMemo
  const analyzeTodo = useMemo(() => {
    console.log("analyzeTodo 호출");
    const totalCount = todo.length;
    const doneCount = todo.filter((it) => it.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return { totalCount, doneCount, notDoneCount };
  }, [todo]);
  // 3. 함수로 반환하는 값을 받기 + useMemo 사용하면서 함수가 아닌 변수가 되었음
  const { totalCount, doneCount, notDoneCount } = analyzeTodo;

  return (
    <div className="TodoList">
      <h4>Todo List 🌱</h4>
      <div>
        <div>총 개수: {totalCount}</div>
        <div>완료됨 : {doneCount}</div>
        <div>해야 할 일: {notDoneCount}</div>
      </div>
      <input className="searchbar" value={search} onChange={onChangeSearch} placeholder="검색어를 입력하세요" />
      <div className="list_wrapper">
        {/* 0. TodoItem을 반복해서 값 찍어주기 (배열 데이터를 렌더링할 때는 배열 메서드 map을 주로 이용)
        HTML 으로 찍을 수도 있고 <div>{it.content}</div>, 컴포넌트로 반환 할 수도 있다
        it = {id, isDone, content, createDate} .. 을 의미 -> props로 넘겨주기
        아이템마다 가지고 있는 고유 key 값이 필요함 = 미리 만들어 뒀던 id 값으로 이용*/}

        {/* {todo.map((it) => (
          <TodoItem key={it.id} {...it} />
        ))} */}

        {/* 1. 검색어 필터링 함수를 통해서 todo의 값을 가져오기 */}
        {getSearchResult().map((it) => (
          <TodoItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
