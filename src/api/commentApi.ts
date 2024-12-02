import axios from 'axios';

export interface Comment {
  _id: string;
  content: string;
  author: string;
  postId: string;
  likes?: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

const API_BASE_URL = 'http://localhost:5000/api/comment';

export const createComment = (commentData: Partial<Comment>) => {
  return axios.post<ApiResponse<Comment>>(`${API_BASE_URL}`, commentData);
};

export const getCommentsForPost = (postId: string) => {
  return axios.get<ApiResponse<Comment[]>>(`${API_BASE_URL}/post/${postId}`);
};

export const likeComment = (commentId: string) => {
  return axios.put<ApiResponse<Comment>>(`${API_BASE_URL}/${commentId}/like`);
};

export const editComment = (commentId: string, commentData: Partial<Comment>) => {
  return axios.put<ApiResponse<Comment>>(`${API_BASE_URL}/${commentId}`, commentData);
};

export const deleteComment = (commentId: string) => {
  return axios.delete<void>(`${API_BASE_URL}/${commentId}`);
}; 