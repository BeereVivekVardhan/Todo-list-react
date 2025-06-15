import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Export environment variables with defaults
export const PORT = process.env.PORT || 5000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todolist'; 