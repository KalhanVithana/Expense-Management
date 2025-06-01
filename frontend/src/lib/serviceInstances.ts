import axios from "axios";
import { config } from './config';
const API_BASE_URL_USER = config.userServiceBaseUrl;;
const API_BASE_URL_EXPENSES = config.expensesServiceBaseUrl;;
export const userAxiosInstance =axios.create({
  baseURL: API_BASE_URL_USER ,
  headers: { 'Content-Type': 'application/json' },
   withCredentials: true, 
});

export const expenseAxiosInstance = axios.create({
   baseURL: API_BASE_URL_EXPENSES ,
  headers: { 'Content-Type': 'application/json' },
   withCredentials: true, 
});


