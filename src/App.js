import React, {useState, useRef, useCallback} from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    }, 
    {
      id: 2,
      text: '컴포넌트 스타일링 해보기',
      checked: true,
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어보기',
      checked: false,
    },
  ]);

  //고윳값으로 사용될 id
  //ref를 사용해 변수 담기
  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current, 
        text,
        checked: false,
      };
      setTodos(todos.concat(todo)); // concat으로 복제한 뒤 set
      nextId.current += 1; // nextId 1씩 더하기
    }, 
    [todos],
  );

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    }, [todos],
  );

  const onToggle = useCallback(
    id => {
      setTodos(todos.map(todo => 
        todo.id === id ? {...todo, checked: !todo.checked} : todo,
        ), //불변성을 유지하면서 특정 배열 원소를 업데이트할 때 map 함수 사용
      );
    }, [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  )
}

export default App;
