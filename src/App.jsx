import { TodoForm } from "./components/TodoForm/TodoForm.jsx";
import { TodoList } from "./components/TodoList/TodoList.jsx";
import { TodoFilters } from "./components/TodoFilters/TodoFilters.jsx";
import {Alert} from "./components/Alert/Alert.jsx";
import {Loader} from "./components/Loader/Loader.jsx";
import { useTodos } from "./hooks/todo.js";
import styles from "./App.module.css";

function App() {
  const todos = useTodos();

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/to-do.png" />
        <h2 className={styles.Title}>To-do App</h2>
      </header>

      <div className={styles.AppContainer}>
        {todos.isLoading && <Loader />}
        {!!todos.error.message && 
        <Alert onClear={todos.error.clear}>{todos.error.message}</Alert>
        }
        <TodoForm onCreate={todos.create} />
        <TodoFilters onFilter={todos.filters} />
        <TodoList
          todos={todos.data}
          onUpdate={todos.update}
          onDelete={todos.delete}
        />
      </div>
    </div>
  );
}

export default App;
