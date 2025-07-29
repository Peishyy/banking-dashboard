import { Router } from 'express';
import { getAllTransactions, getTransactions, transferMoney } from '../controllers/transactionController';

export const transactionRoutes = Router();

// ✅ Get all transactions (for dashboard or full list)
transactionRoutes.get('/', getAllTransactions);

// ✅ Get transactions for a specific user
transactionRoutes.get('/:userId', getTransactions);

// ✅ Transfer money
transactionRoutes.post('/transfer', transferMoney);
