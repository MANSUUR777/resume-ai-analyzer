import axios from 'axios';

export const api = axios.create({
  // Your Live Render URL
  baseURL: 'https://resume-ai-analyzer-5vr7.onrender.com/api', 
});
