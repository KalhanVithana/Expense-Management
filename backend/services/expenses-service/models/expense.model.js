import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  expenseName: { type: String, required: true },
  notes: { type: String },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  userId: { type: String, required: true }, 
});

export const Expense = mongoose.model('Expense', expenseSchema);
