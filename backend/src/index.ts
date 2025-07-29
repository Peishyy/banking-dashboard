import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRoutes } from './routes/userRoutes';
import { transactionRoutes } from './routes/transactionRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

// Root route to handle GET /
app.get('/', (req, res) => {
  res.send('🚀 Backend server is running!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
