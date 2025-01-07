import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';

// Fetch Pending Applications
export const fetchPendingApplications = async (token, queryParams = {}) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/applications/pending`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: queryParams,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching pending applications:', error.response?.data || error.message);
        throw error;
    }
};

// Fetch ATS Applications
export const fetchATSApplications = async (token, queryParams = {}) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/applications/ats`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: queryParams,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching ATS applications:', error.response?.data || error.message);
        throw error;
    }
};
