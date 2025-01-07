// utils/auth.js

export const getUserFromToken = () => {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    
    if (!token) return null; // Return null if no token exists
    
    try {
        // Decode the token to get user information (using JWT token decoding method)
        const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the payload part of the JWT
        
        return decoded.user; // Assuming user information is stored in the payload (adjust based on your token structure)
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null; // Return null if decoding fails
    }
};
