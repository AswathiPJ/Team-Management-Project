import axios from 'axios';
import { useSelector } from 'react-redux';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8000/',  // Adjust the base URL to match your Django backend URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all chat rooms

// Fetch messages for a specific room
export const fetchMessages = async (roomSlug) => {
  try {
    const response = await apiClient.get(`/chat/${roomSlug}/room/`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

// Send a new message
export const sendMessage = async (roomSlug, message, username) => {
  try {
    const response = await apiClient.post(`/chat/${roomSlug}/messages/`, {
      message,
      username,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
