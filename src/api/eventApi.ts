import axios from 'axios';

export interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  capacity: number;
  registrationLink: string;
}

export interface NewEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  capacity: number;
  registrationLink: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

const API_BASE_URL = 'http://localhost:5000/api/events';

export const createEvent = (eventData: NewEvent) => {
  return axios.post<ApiResponse<Event>>(`${API_BASE_URL}`, eventData);
};

export const getAllEvents = () => {
  return axios.get<ApiResponse<Event[]>>(`${API_BASE_URL}`);
}; 