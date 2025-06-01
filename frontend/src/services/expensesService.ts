import {  apiExpenses} from '../lib/apiClient';

export interface Expense {
  id?: number;  
  title: string;
  amount: number;
  date: string;

}

export const expenseService = {
  getAllExpenses: () => apiExpenses.get<Expense[]>('/expenses'),

  getExpenseById: (id: number) => apiExpenses.get<Expense>(`/expenses/${id}`),

  createExpense: (data: Partial<Expense>) => apiExpenses.post<Expense>('/expenses/create', data),

  updateExpense: (data: Partial<Expense>) => apiExpenses.put<Expense>(`/expenses/update`, data),

  deleteExpense: (id: string) => apiExpenses.delete<void>(`/expenses/${id}`),
};
