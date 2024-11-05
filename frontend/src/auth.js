// auth.js

// Helper function to decode base64 URL
function base64UrlDecode(base64Url) {
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);
    return decodeURIComponent(
        decoded.split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join('')
    );
}

export const getUserFromToken = () => {
    try {
        // Retrieve the token from cookies
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];

        if (!token) return null;

        // Split the JWT token (header.payload.signature) and decode the payload
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(base64UrlDecode(payload));

        // Return the decoded payload
        return decodedPayload || null;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};
