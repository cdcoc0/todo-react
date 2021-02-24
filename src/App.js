import React, {useState, useRef, useCallback} from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
  const array = [];
  for(let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }

  return array;
}

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos);

  //고윳값으로 사용될 id
  //ref를 사용해 변수 담기
  const nextId = useRef(2501);

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
