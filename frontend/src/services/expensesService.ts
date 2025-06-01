import {  apiExpenses} from '../lib/apiClient';

export interface Expense {
  id: string;  
  title: string;
  amount: number;
  date: string;

}
interface GetAllExpensesResponse {
  data: {
    expenses: Expense[];
  };
}

export const expenseService = {
getAllExpenses: () => apiExpenses.get<GetAllExpensesResponse>('/expenses'),

  getExpenseById: (id: number) => apiExpenses.get<Expense>(`/expenses/${id}`),

  createExpense: (data: Expense) => apiExpenses.post<Expense>('/expenses/create', data),

  updateExpense: (data: Expense) => apiExpenses.put<Expense>(`/expenses/update`, data),

  deleteExpense: (id: string) => apiExpenses.delete<void>(`/expenses/${id}`),

  getMonthlyLimit: (id: string) => apiExpenses.get<any>(`/expenses/limit/${id}`),
};
