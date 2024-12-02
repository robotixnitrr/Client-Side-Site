import axios from 'axios';

export interface User {
  _id: string;
  username: string;
  email: string;
  isAdmin?: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

const API_BASE_URL = 'http://localhost:5000/api/user';

export const getUser = (userId: string) => {
  return axios.get<ApiResponse<User>>(`${API_BASE_URL}/${userId}`);
};

export const updateUser = (userId: string, userData: Partial<User>) => {
  return axios.put<ApiResponse<User>>(`${API_BASE_URL}/${userId}`, userData);
};

export const deleteUser = (userId: string) => {
  return axios.delete<void>(`${API_BASE_URL}/${userId}`);
}; 