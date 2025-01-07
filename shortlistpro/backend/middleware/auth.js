import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

const authenticate = async (req, res, next) => {
  let token;
  console.log('Authorization Header:', req.headers.authorization);
  
 
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    if(!decoded.userId){
      console.error('Token missing userId field.');
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    req.user = await User.findById(decoded.userId || decoded.id).select('-password');
    console.log('User fetched from DB:', req.user);
    if (!req.user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
      
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.name === 'TokenExpiredError' ? 'Token expired. Please log in again.' : 'Invalid token',
    });
  }
};

export default authenticate;
