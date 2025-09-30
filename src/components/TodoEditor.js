import { useRef, useState, useContext } from "react";
import "./css/TodoEditor.css";
import { TodoDispatchContext } from "../App";

// App에서 만든 props 전달 해주기 -> createContext 이용해서 props 받아오기
const TodoEditor = () => {
  const { onCreate } = useContext(TodoDispatchContext);

  // input의 값 저장 할 변수를 useState 이용해서 만들기
  const [content, setContent] = useState("");
  // validation을 위해 ref값 만들어주기
  const inputRef = useRef();

  // input의 값이 변경 됐을 때 가져오는 함수
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  // 추가 button 눌렀을 때 작동 할 함수
  const onSubmit = () => {
    // 현재 content는 "" 빈칸, 즉 false임 -> !content는 true가 되고 if문을 실행하게 됨
    if (!content || content.trim() === "") {
      alert("내용이 입력되지 않았습니다.");
      inputRef.current.focus();
      return;
    }
    onCreate(content);
    setContent(""); // 제출 후 입력 폼 초기화
    inputRef.current.focus();
  };

  // 키보드 Enter 키로도 제출할 수 있게 만들어주기
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <div className="TodoEditor">
      <h4>새로운 Todo 작성하기 ✏️</h4>
      <div className="editor_wrapper">
        <input
          ref={inputRef}
          value={content}
          onChange={onChangeContent}
          onKeyDown={onKeyDown}
          placeholder="새로운 Todo..."
        />
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  );
};

export default TodoEditor;
