import axios, { AxiosResponse } from 'axios';

export interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
    category: string;
    imageUrl: string;
    updatedAt?: string;
    createdAt?: string;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
}

const API_BASE_URL = `${import.meta.env.API_BASE_URL}/post`;

export const getAllPosts = (): Promise<AxiosResponse<ApiResponse<Post[]>>> => {
    return axios.get<ApiResponse<Post[]>>(`${API_BASE_URL}`);
};

export const getQueryLimitPost = (limit: number): Promise<AxiosResponse<ApiResponse<Post[]>>> => {
    return axios.get<ApiResponse<Post[]>>(`${API_BASE_URL}/limit-posts/${limit}`);
};

export const createPost = (postData: Partial<Post>): Promise<AxiosResponse<ApiResponse<Post>>> => {
    return axios.post<ApiResponse<Post>>(`${API_BASE_URL}`, postData);
};

export const getPost = (postId: string): Promise<AxiosResponse<ApiResponse<Post>>> => {
    return axios.get<ApiResponse<Post>>(`${API_BASE_URL}/${postId}`);
};

export const updatePost = (postId: string, postData: Partial<Post>): Promise<AxiosResponse<ApiResponse<Post>>> => {
    return axios.put<ApiResponse<Post>>(`${API_BASE_URL}/${postId}`, postData);
};

export const deletePost = (postId: string): Promise<AxiosResponse<void>> => {
    return axios.delete<void>(`${API_BASE_URL}/${postId}`);
};
