import { useState } from "react";
import { nanoid } from "nanoid";

const App = () => {
  interface Todo {
    id: string;
    title: string;
    body: string;
    isDone: boolean;
  }
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const onChangeTitle = (event: React.FormEvent<HTMLInputElement>): void => {
    const {
      currentTarget: { value },
    } = event;
    setTitle(value);
  };

  const onChangeBody = (event: React.FormEvent<HTMLInputElement>): void => {
    const {
      currentTarget: { value },
    } = event;
    setBody(value);
  };

  const resetInput = (): void => {
    setTitle("");
    setBody("");
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const newTodo: Todo = {
      id: nanoid(),
      title,
      body,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    resetInput();
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <label>제목</label>
        <input type="text" value={title} onChange={onChangeTitle}></input>
        <label>내용</label>
        <input type="text" value={body} onChange={onChangeBody}></input>
        <button type="submit">추가</button>
      </form>
      <div>
        {todos.map((todo) => {
          return (
            <div key={todo.id}>
              <p>{todo.title}</p>
              <p>{todo.body}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
