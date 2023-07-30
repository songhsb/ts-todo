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
    if (!(title && body)) {
      return;
    }

    const newTodo: Todo = {
      id: nanoid(),
      title,
      body,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    resetInput();
  };

  const onClickDelete = (id: string): void => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const onClickSwitch = (id: string): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
    setTodos(newTodos);
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
      <section>
        <p>isWorking</p>
        {todos
          .filter((todo) => {
            return todo.isDone === false;
          })
          .map((todo) => {
            return (
              <div key={todo.id}>
                <p>{todo.title}</p>
                <p>{todo.body}</p>
                <button type="button" onClick={() => onClickDelete(todo.id)}>
                  삭제
                </button>
                <button type="button" onClick={() => onClickSwitch(todo.id)}>
                  완료
                </button>
              </div>
            );
          })}
        <p>isDone</p>
        {todos
          .filter((todo) => {
            return todo.isDone === true;
          })
          .map((todo) => {
            return (
              <div key={todo.id}>
                <p>{todo.title}</p>
                <p>{todo.body}</p>
                <button type="button" onClick={() => onClickDelete(todo.id)}>
                  삭제
                </button>
                <button type="button" onClick={() => onClickSwitch(todo.id)}>
                  취소
                </button>
              </div>
            );
          })}
      </section>
    </>
  );
};

export default App;
