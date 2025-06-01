import express from 'express';
import serverless from 'serverless-http';
import expensesRoutes from './routes/expenses.routes.js';
import connectDB from './db/index.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import cors from 'cors';


console.log("STARTING");
const app = express();
connectDB()
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.error("DB connection failed", err);
    process.exit(1); 
  });

app.use(cors({
  origin: true,         
  credentials: true,    
}));

app.options('*', cors()); 
app.use(express.json());
app.use('/expenses', authenticateUser, expensesRoutes);

export const handler = serverless(app);
