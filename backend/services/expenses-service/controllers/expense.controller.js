import { Expense } from "../models/expense.model.js";
import { v4 as uuidv4 } from "uuid";
import { errorResponse, successResponse } from "../utils/responseFormatter.js";
import { securityHeaders } from "../middleware/securityHeaders.js";
import { sendResponse } from "../utils/sendResponse.js";

export const createExpense = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const MAX_MONTHLY_LIMIT = 10000.0;

   
    const expenseDate = new Date(req.body.date);
    const expenseAmount = parseFloat(req.body.amount);

   
    const expenseYear = expenseDate.getFullYear();
    const expenseMonth = expenseDate.getMonth();

 
    const monthlyExpenses = await Expense.find({
      userId,
      date: {
        $gte: new Date(expenseYear, expenseMonth, 1),
        $lt: new Date(expenseYear, expenseMonth + 1, 1),
      },
    });

   
    const totalMonthlyExpense = monthlyExpenses.reduce(
      (sum, exp) => sum + exp.amount,
      0
    );

  
    if (totalMonthlyExpense + expenseAmount > MAX_MONTHLY_LIMIT) {
      const response = securityHeaders(
        errorResponse(
          `Monthly expense limit of ${MAX_MONTHLY_LIMIT} exceeded`,
          400
        )
      );
      return sendResponse(res, response);
    }

 
    const newExpense = new Expense({
      ...req.body,
      userId,
      date: expenseDate,
    });
    const savedExpense = await newExpense.save();

    const response = securityHeaders(
      successResponse({ message: "Expense saved", expense: savedExpense })
    );
    sendResponse(res, response);
  } catch (err) {
    console.error(err);
    const response = securityHeaders(errorResponse("Failed to save expense"));
    sendResponse(res, response);
  }
};


export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({});

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();


    const monthlyExpenses = expenses.filter(exp => {
      const expDate = new Date(exp.date);
      return (
        expDate.getMonth() === currentMonth &&
        expDate.getFullYear() === currentYear
      );
    });

  
    const totalMonthlyExpense = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    const MAX_MONTHLY_LIMIT = 10000.0;
    const thresholdReached = totalMonthlyExpense >= 0.9 * MAX_MONTHLY_LIMIT;

    const response = securityHeaders(
      successResponse({ 
        message: "Expenses retrieved",
        expenses,
        totalMonthlyExpense,
        alert: thresholdReached ? "Warning! You have reached 90% of your monthly limit." : null,
        maxMonthlyLimit: MAX_MONTHLY_LIMIT
      })
    );
    sendResponse(res, response);
  } catch (err) {
    console.error(err);
    const response = securityHeaders(
      errorResponse("Failed to retrieve expenses")
    );
    sendResponse(res, response);
  }
};


export const getExpenseById = async (req, res) => {
  try {
    console.log("req",req);
    
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      const response = securityHeaders(errorResponse("Expense not found", 404));
      return sendResponse(res, response);
    }
    const response = securityHeaders(
      successResponse({ message: "Expense retrieved", expense })
    );
    sendResponse(res, response);
  } catch (err) {
    console.error(err);
    const response = securityHeaders(
      errorResponse("Failed to retrieve expense")
    );
    sendResponse(res, response);
  }
};

export const updateExpense = async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.body.id,
      {
        description: req.body.description,
        amount: req.body.amount,
        date: new Date(req.body.date),
        type: req.body.type,
      },
      { new: true }
    );

    if (!updatedExpense) {
      const response = securityHeaders(errorResponse("Expense not found", 404));
      return sendResponse(res, response);
    }

    const response = securityHeaders(
      successResponse({ message: "Expense updated", expense: updatedExpense })
    );
    sendResponse(res, response);
  } catch (err) {
    console.error(err);
    const response = securityHeaders(errorResponse("Failed to update expense"));
    sendResponse(res, response);
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      const response = securityHeaders(errorResponse("Expense not found", 404));
      return sendResponse(res, response);
    }
    const response = securityHeaders(
      successResponse({ message: "Expense deleted" })
    );
    sendResponse(res, response);
  } catch (err) {
    console.error(err);
    const response = securityHeaders(errorResponse("Failed to delete expense"));
    sendResponse(res, response);
  }
};
