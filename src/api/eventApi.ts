import axios from 'axios';

export interface Event {
  _id: string;
  title: string;
  date: Date;
  time: string;
  category: string;
  venue: string;
  description: string;
  eventType: string;
  imageUrl: string;
  capacity: number;
  registrationLink: string;
}

export interface NewEvent {
  title: string;
  date: Date | null;
  time: string;
  category: string;
  venue: string;
  description: string;
  eventType: string | null;
  imageUrl: string;
  capacity: Number | null;
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
  return axios.get(`${API_BASE_URL}`);
}; 