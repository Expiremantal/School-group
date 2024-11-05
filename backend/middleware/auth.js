// auth.js
import jwtDecode from 'jwt-decode';

export const getUserFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error("Token decoding failed", error);
            return null;
        }
    }
    return null;
};
