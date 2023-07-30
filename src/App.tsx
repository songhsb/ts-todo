import { useState } from "react";
import { nanoid } from "nanoid";
import styled from "styled-components";

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
    <StLayout>
      <StHeader>
        <h1>TodoList</h1>
      </StHeader>
      <StForm onSubmit={onSubmitHandler}>
        <label>제목</label>
        <input type="text" value={title} onChange={onChangeTitle}></input>
        <label>내용</label>
        <input type="text" value={body} onChange={onChangeBody}></input>
        <button type="submit">추가</button>
      </StForm>
      <section>
        <h2>isWorking🔥</h2>
        <StTodosUl>
          {todos
            .filter((todo) => {
              return todo.isDone === false;
            })
            .map((todo) => {
              return (
                <StTodoLi key={todo.id}>
                  <div>
                    <h3>{todo.title}</h3>
                    <p>{todo.body}</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => onClickDelete(todo.id)}
                    >
                      삭제
                    </button>
                    <button
                      type="button"
                      onClick={() => onClickSwitch(todo.id)}
                    >
                      완료
                    </button>
                  </div>
                </StTodoLi>
              );
            })}
        </StTodosUl>
        <h2>isDone🎉</h2>
        <StTodosUl>
          {todos
            .filter((todo) => {
              return todo.isDone === true;
            })
            .map((todo) => {
              return (
                <StTodoLi key={todo.id}>
                  <div>
                    <h3>{todo.title}</h3>
                    <p>{todo.body}</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => onClickDelete(todo.id)}
                    >
                      삭제
                    </button>
                    <button
                      type="button"
                      onClick={() => onClickSwitch(todo.id)}
                    >
                      취소
                    </button>
                  </div>
                </StTodoLi>
              );
            })}
        </StTodosUl>
      </section>
    </StLayout>
  );
};

const StLayout = styled.div`
  max-width: 1200px;
  min-width: 600px;
  margin: 0 auto;
`;

const StHeader = styled.header`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const StTodosUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

const StTodoLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px;
  list-style: none;
  border: thick double #32a1ce;
`;

export default App;
