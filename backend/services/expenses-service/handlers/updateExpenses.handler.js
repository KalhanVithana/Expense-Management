import connectDB from '../utils/db.js';
import { updateExpense } from '../controllers/expenseController.js';

export const handler = async (event) => {
  await connectDB();

  try {
    const id = event.pathParameters.id;
    const data = JSON.parse(event.body);

    const updatedExpense = await updateExpense(id, data);

    if (!updatedExpense) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Expense not found' }),
        headers: { 'Content-Type': 'application/json' },
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(updatedExpense),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};
