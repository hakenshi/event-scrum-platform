import api from './api';
import { Event, ScrumBoard, ScrumFormData } from '../types';

export const eventApi = {
  // Events
  getEvents: () => api.get<Event[]>('/events'),
  createEvent: (data: Partial<Event>) => api.post<Event>('/events', data),
  getEvent: (id: string) => api.get<Event>(`/events/${id}`),
  updateEvent: (id: string, data: Partial<Event>) => api.put<Event>(`/events/${id}`, data),
  deleteEvent: (id: string) => api.delete(`/events/${id}`),

  // Scrum Boards
  createScrumBoard: (eventId: string, data: ScrumFormData) => 
    api.post<ScrumBoard>(`/events/${eventId}/scrum-boards`, data),
  getScrumBoard: (id: string) => api.get<ScrumBoard>(`/scrum-boards/${id}`),
  updateTaskStatus: (boardId: string, taskId: string, status: string) =>
    api.patch(`/scrum-boards/${boardId}/tasks/${taskId}/status`, { status }),
};