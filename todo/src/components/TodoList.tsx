import { useState, useEffect } from 'react';
import type { Todo } from '../services';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from '../services';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');

  // Fetch all todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getAllTodos();
        setTodos(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch todos. Make sure your backend server is running at http://localhost:5000');
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Handle creating a new todo
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      setError(null);
      const todo: Omit<Todo, '_id'> = {
        title: newTodo,
        description: newDescription,
        completed: false,
      };

      const createdTodo = await createTodo(todo);
      setTodos([createdTodo, ...todos]);
      setNewTodo('');
      setNewDescription('');
    } catch (err) {
      setError('Failed to create todo. Make sure your backend server is running.');
    }
  };

  // Handle toggling a todo's completion status
  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      setError(null);
      await updateTodo(id, { completed: !completed });
      setTodos(
        todos.map((todo) => (todo._id === id ? { ...todo, completed: !completed } : todo))
      );
    } catch (err) {
      setError('Failed to update todo status');
    }
  };

  // Handle deleting a todo
  const handleDeleteTodo = async (id: string) => {
    try {
      setError(null);
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  if (loading) {
    return <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading todos...</p>
    </div>;
  }

  return (
    <div className="todo-container">
      <h2 className="section-title">
        <span className="emoji-icon rotate-emoji">🌟</span>
        My Tasks
      </h2>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleAddTodo} className="todo-form">
        <div className="form-group">
          <label htmlFor="todo-title" className="form-label">
            <span className="emoji-icon">📝</span> Task Title
          </label>
          <input
            id="todo-title"
            type="text"
            placeholder="What needs to be done today?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="todo-input"
            required
          />
          
          <label htmlFor="todo-description" className="form-label">
            <span className="emoji-icon">📋</span> Description (optional)
          </label>
          <textarea
            id="todo-description"
            placeholder="Add details about this important task..."
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="todo-description"
          />
          
          <button type="submit" className="add-button">
            <span className="button-icon">✨</span> Add Task
          </button>
        </div>
      </form>
      
      <div className="todos-header">
        <h3>
          <span className="emoji-icon">📌</span>
          All Tasks ({todos.length})
        </h3>
        {todos.length > 0 && (
          <div className="todo-stats">
            <span>
              ✅ {todos.filter(todo => todo.completed).length} completed / {todos.length} total
            </span>
          </div>
        )}
      </div>
      
      <ul className="todos">
        {todos.length === 0 ? (
          <li className="todo-item empty">
            <div className="empty-state">
              <p>No tasks yet. Start being productive!</p>
              <span className="empty-icon">🚀</span>
              <p className="empty-state-subtitle">Your completed tasks will appear here</p>
            </div>
          </li>
        ) : (
          todos.map((todo) => (
            <li key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-content">
                <div className="todo-header">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(todo._id!, todo.completed)}
                      className="todo-checkbox"
                    />
                    <span className="checkmark"></span>
                  </label>
                  <h3 className={todo.completed ? 'completed-text' : ''}>
                    {todo.completed ? '✓ ' : ''}
                    {todo.title}
                  </h3>
                </div>
                {todo.description && (
                  <div className="todo-description-text">
                    <span className="description-icon">📄</span> {todo.description}
                  </div>
                )}
                <div className="todo-meta">
                  {todo.createdAt && (
                    <span className="todo-date">
                      <span className="date-icon">🕒</span> Created: {new Date(todo.createdAt).toLocaleDateString()}
                    </span>
                  )}
                  <span className="priority-badge">{todo.completed ? '✅ Completed' : '⏳ Pending'}</span>
                </div>
              </div>
              <div className="todo-actions">
                <button
                  onClick={() => handleToggleComplete(todo._id!, todo.completed)}
                  className="toggle-button"
                  aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                >
                  <span className="toggle-icon">{todo.completed ? '↩️' : '✓'}</span>
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo._id!)}
                  className="delete-button"
                  aria-label="Delete task"
                >
                  <span className="delete-icon">🗑️</span>
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList; 