import { useRef, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";

// mock data
const mockTodo = [
  { id: 2, isDone: false, content: "영화 보기", createDate: new Date().getTime() },
  {
    id: 1,
    isDone: false,
    content: "분리수거 하기",
    createDate: new Date().getTime(),
  },
  { id: 0, isDone: false, content: "React 공부하기", createDate: new Date().getTime() },
];

function App() {
  const [todo, setTodo] = useState(mockTodo);
  const idRef = useRef(3); // 기본값 id 증가를 위해 useRef 훅 사용

  // 할일추가함수 (매개변수로 사용자가 작성한 할 일 데이터로 받기)
  const onCreate = (content) => {
    const newItem = {
      id: idRef.current,
      content,
      isDone: false,
      createDate: new Date().getTime(),
    };
    setTodo([newItem, ...todo]); // 최신순으로 정렬하기 위해서
    idRef.current += 1;
  };

  return (
    <div className="App">
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} />
    </div>
  );
}

export default App;
