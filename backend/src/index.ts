import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';
import { PORT } from './config/env.js';

// Connect to MongoDB
connectDB();

// Initialize Express app
const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/todos', todoRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Todo List API is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 