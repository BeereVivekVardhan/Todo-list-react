import express from 'express';
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController.js';

const router = express.Router();

// GET all todos
router.get('/', getTodos);

// GET a single todo
router.get('/:id', getTodoById);

// POST a new todo
router.post('/', createTodo);

// PUT/update a todo
router.put('/:id', updateTodo);

// DELETE a todo
router.delete('/:id', deleteTodo);

export default router; 