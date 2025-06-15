import axios from 'axios';

// Define the Todo interface
export interface Todo {
  _id?: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Base URL for API calls
const API_URL = 'http://localhost:5000/api/todos';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all todos
export const getAllTodos = async (): Promise<Todo[]> => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// Get a single todo by ID
export const getTodoById = async (id: string): Promise<Todo> => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching todo with id ${id}:`, error);
    throw error;
  }
};

// Create a new todo
export const createTodo = async (todo: Omit<Todo, '_id'>): Promise<Todo> => {
  try {
    const response = await api.post('/', todo);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// Update an existing todo
export const updateTodo = async (id: string, todo: Partial<Todo>): Promise<Todo> => {
  try {
    const response = await api.put(`/${id}`, todo);
    return response.data;
  } catch (error) {
    console.error(`Error updating todo with id ${id}:`, error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error(`Error deleting todo with id ${id}:`, error);
    throw error;
  }
};

// Toggle todo completion status
export const toggleTodoCompletion = async (id: string, completed: boolean): Promise<Todo> => {
  try {
    const response = await api.put(`/${id}`, { completed });
    return response.data;
  } catch (error) {
    console.error(`Error toggling completion status for todo with id ${id}:`, error);
    throw error;
  }
}; 