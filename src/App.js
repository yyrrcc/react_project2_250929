import React, { useCallback, useReducer, useRef, useMemo } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";

// TodoContext (todo), TodoDispatchContext (dispatch 함수) 나눠주기
export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

// useReducer 함수
function reducer(todo, action) {
  switch (action.type) {
    case "CREATE": {
      return [action.newItem, ...todo];
    }
    case "UPDATE": {
      return todo.map((it) => (it.id === action.targetId ? { ...it, isDone: !it.isDone } : it));
    }
    case "DELETE": {
      return todo.filter((it) => it.id !== action.targetId);
    }
    default:
      return todo;
  }
}

function App() {
  // useState 대신 useReducer 사용하기!
  //const [todo, setTodo] = useState(mockTodo);
  const [todo, dispatch] = useReducer(reducer, mockTodo);

  const idRef = useRef(3); // 기본값 id 증가를 위해 useRef 훅 사용

  // 1. 할일추가함수 (매개변수로 사용자가 작성한 할 일 데이터로 받기)
  // 1-1. dispatch({ type: "", data : {객체가 온다}, })
  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: { id: idRef.current, content, isDone: false, createDate: new Date().getTime() },
    });
    idRef.current += 1;
  };

  // 4. useCallback
  const onUpdate = useCallback((targetId) => {
    dispatch({ type: "UPDATE", targetId });
  }, []);
  const onDelete = useCallback((targetId) => {
    dispatch({ type: "DELETE", targetId });
  }, []);

  /*
  // 2. 할일수정함수 (체크박스에 틱이 발생했을 때의 id값을 매개변수로 받기, 변화된 값을 setTodo로 변경해주기)
  const onUpdate = (targetId) => {
    // 2. map 메서드를 이용해 배열 todo 에서 id가 targetId와 일치하는 요소를 찾으면, isDone 프로퍼티 값을 토글한 새 배열을 만들어 인수로 전달
    dispatch({ type: "UPDATE", targetId });
    // setTodo(todo.map((it) => (it.id === targetId ? { ...it, isDone: !it.isDone } : it)));
  };

  // 3. 할일삭제함수 (삭제 클릭한 id를 가진 아이템을 제외한 나머지 리스트를 setTodo에 저장)
  const onDelete = (targetId) => {
    dispatch({ type: "DELETE", targetId });
    // setTodo(todo.filter((it) => it.id !== targetId));
  };
   */

  // 5. useMemo를 이용해 TodoDispatchContext.Provider에 전달할 dispatch 함수를 다시 생성하지 않도록 만들기
  const memoizedDispatches = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <div className="App">
      <Header />
      {/* 데이터 공급해주기 props를 객체로 만들어서.. */}
      <TodoStateContext.Provider value={todo}>
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

const mockTodo = [
  { id: 2, isDone: false, content: "분리수거 하기", createDate: new Date().getTime() },
  { id: 1, isDone: false, content: "Java 공부하기", createDate: new Date().getTime() },
  { id: 0, isDone: false, content: "React 공부하기", createDate: new Date().getTime() },
];

export default App;
