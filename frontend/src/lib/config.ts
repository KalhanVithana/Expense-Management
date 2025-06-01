
export const config = {
  userServiceBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL_USER || 'http://localhost:3000',
  expensesServiceBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL_EXPENSES || 'http://localhost:3000',
};