import { userAxiosInstance, expenseAxiosInstance } from './serviceInstances';
import { attachInterceptors } from './axiosInstance';

attachInterceptors(userAxiosInstance);
attachInterceptors(expenseAxiosInstance);

const makeApi = (instance: typeof userAxiosInstance) => ({
  get: <T>(url: string, config = {}) => instance.get<T>(url, config).then(res => res.data),
  post: <T>(url: string, data?: unknown, config = {}) => instance.post<T>(url, data, config).then(res => res.data),
  put: <T>(url: string, data?: unknown, config = {}) => instance.put<T>(url, data, config).then(res => res.data),
  delete: <T>(url: string, config = {}) => instance.delete<T>(url, config).then(res => res.data),
});

export const apiUser = makeApi(userAxiosInstance);
export const apiExpenses = makeApi(expenseAxiosInstance);
