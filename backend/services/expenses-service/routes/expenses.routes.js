import express from 'express';
import {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
} from '../controllers/expense.controller.js';

const router = express.Router();

router.get('/', getAllExpenses);
router.get('/:id', getExpenseById);
router.post('/create', createExpense);
router.put('/update', updateExpense);
router.delete('/:id', deleteExpense);

export default router;
