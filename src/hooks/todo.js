import { useState, useEffect } from "react";
import { api } from "../api.js";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setLoading] = useState(false);

  async function fetchTodos() {
    setLoading(true);
    try {
      const data = await api.todos.getAll(filters);
      setTodos(data);
    } catch (error) {
      setErrorMessage("Failed to get todo's, Please try again");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, [filters]);

  async function handleCreate(newTodo) {
    setLoading(true);
    try {
      await api.todos.create(newTodo);
      await fetchTodos();
    } catch (error) {
      setErrorMessage("Failed to create todo, Please try again");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdated({ id, newTodo }) {
    setLoading(true);
    try {
      await api.todos.update(id, newTodo);
      await fetchTodos();
    } catch (error) {
      setErrorMessage("Failed to update todo, Please try again");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    setLoading(true);
    try {
      await api.todos.delete(id);
      await fetchTodos();
    } catch (error) {
      setErrorMessage("Failed to delete todo, Please try again");
    } finally {
      setLoading(false);
    }
  }
  return {
    isLoading,
    data: todos,
    fetch: fetchTodos,
    filters: setFilters,
    create: handleCreate,
    update: handleUpdated,
    delete: handleDelete,
    error: {
      message: errorMessage,
      clear: () => setErrorMessage(),
    },
  };
}
