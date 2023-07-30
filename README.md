# TypeSrcipt TodoList
react-todo를 배운 TypeSrcipt를 사용해 다시 만들어 보자

# Todo interface
interface Todo {
    id: string;
    title: string;
    body: string;
    isDone: boolean;
  }

# useState(todos)
const [todos, setTodos] = useState<Todo[]>([]);
