import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Assuming default FastAPI port

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const indexProject = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/index', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const queryProject = async (jobId, queryText) => {
  const response = await api.post('/query', {
    job_id: jobId,
    query: queryText,
  });
  return response.data;
};
