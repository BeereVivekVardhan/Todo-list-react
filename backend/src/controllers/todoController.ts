import { Request, Response } from 'express';
import Todo, { ITodo } from '../models/Todo.js';

// Get all todos
export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error in getTodos:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single todo
export const getTodoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }
    
    res.status(200).json(todo);
  } catch (error) {
    console.error('Error in getTodoById:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create a new todo
export const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      res.status(400).json({ message: 'Title is required' });
      return;
    }
    
    const newTodo = await Todo.create({
      title,
      description: description || '',
      completed: false,
    });
    
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error in createTodo:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a todo
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, completed } = req.body;
    
    // Find the todo first to check if it exists
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }
    
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true, runValidators: true }
    );
    
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error('Error in updateTodo:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a todo
export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }
    
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error in deleteTodo:', error);
    res.status(500).json({ message: 'Server error', error });
  }
}; 