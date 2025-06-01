import express from 'express';
import {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  checkMonthlyLimitStatus,
} from '../controllers/expense.controller.js';

const router = express.Router();
router.get('/', getAllExpenses);
router.get('/:id', getExpenseById);
router.post('/create', createExpense);
router.put('/update', updateExpense);
router.delete('/:id', deleteExpense);
router.get('/limit/:id', checkMonthlyLimitStatus);

export default router;
