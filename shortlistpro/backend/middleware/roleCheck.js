// roleCheck.js
const roleCheck = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role; // Ensure that req.user contains user info from the authentication middleware
  
      if (allowedRoles.includes(userRole)) {
        next();
      } else {
        res.status(403).json({ message: 'Access denied: insufficient permissions' });
      }
    };
  };
  
  export default roleCheck;
  