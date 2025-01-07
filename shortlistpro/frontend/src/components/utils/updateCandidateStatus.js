// utils/updateCandidateStatus.js
import axios from 'axios';

export const updateCandidateStatus = async (id, newStatus) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/v1/candidates/${id}`, { status: newStatus });
    return response.data;
  } catch (error) {
    console.error('Error updating candidate status:', error);
    throw error;
  }
};
