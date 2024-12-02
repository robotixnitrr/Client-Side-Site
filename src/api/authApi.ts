import axios from 'axios';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  username: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

const API_BASE_URL = 'http://localhost:5000/api/auth';

export const login = (credentials: LoginCredentials) => {
  return axios.post<LoginResponse>(`${API_BASE_URL}/login`, credentials);
};

export const signup = (userData: LoginCredentials & { username: string }) => {
  return axios.post<LoginResponse>(`${API_BASE_URL}/signup`, userData);
};

export const loginWithGoogle = (token: string) => {
  // return axios.post(`${API_BASE_URL}/google`, { token });
}; 