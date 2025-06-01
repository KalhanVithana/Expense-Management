// import connectDB from "../db/index.js";
// import { createExpense } from "../controllers/expense.controller.js";
// import { securityHeaders } from "../middleware/securityHeaders.js";
// import { successResponse as success,errorResponse as error} from "../utils/responseFormatter.js";
// export const addExpenses = async (event) => {
//   try {
//     await connectDB();
//     const data = JSON.parse(event.body);
//     const savedExpense = await createExpense(data);
//     return securityHeaders(success({ message: "Expense saved", expense: savedExpense }));
//   } catch (err) {
//     return securityHeaders(error(err.message));
//   }
// };
