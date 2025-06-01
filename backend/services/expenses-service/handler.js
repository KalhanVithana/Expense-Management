import express from 'express';
import serverless from 'serverless-http';
import expensesRoutes from '../expenses-service/routes/expenses.routes.js';
import connectDB from './db/index.js';
import { authenticateUser } from './middleware/authMiddleware.js';

console.log("Starting app...");

const app = express();
app.use(express.json());

let isDBConnected = false;

async function init() {
  if (!isDBConnected) {
    await connectDB();
    isDBConnected = true;
    console.log("DB connected");
  }
}
await init();

app.use('/expenses', authenticateUser, expensesRoutes);

export const handler = serverless(app);
