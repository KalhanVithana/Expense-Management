import { apiUser } from '../lib/apiClient';

export interface User {
  name: string;
  email: string;
}

export const userService = {
  getUsers: () => apiUser.get<User[]>('/users'),
  getUserById: (id: number) => apiUser.get<User>(`/users/${id}`),
  signUp: async (data: Partial<User>) => apiUser.post<User>('/register', data),
  updateUser: (id: number, data: Partial<User>) => apiUser.put<User>(`/users/${id}`, data),
  deleteUser: (id: number) => apiUser.delete<void>(`/users/${id}`),
};
