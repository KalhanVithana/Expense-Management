import express from 'express';
import serverless from 'serverless-http';
import authRoutes from './routes/auth.routes.js';
import connectDB from './db/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 

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
app.use(cookieParser()); 
app.use('/', authRoutes);

export const handler = serverless(app);
