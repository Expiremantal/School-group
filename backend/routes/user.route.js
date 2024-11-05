import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.models.js'; // Adjust the path as needed

const userRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Store this in an environment variable
const TWO_WEEKS_IN_SECONDS = 14 * 24 * 60 * 60; // Two weeks in seconds

// Registration Route
userRouter.post('/register', async (req, res) => {
  const { fullname, email, phoneNumber, password} = req.body;

  try {
      if (!fullname || !email || !phoneNumber || !password ) {
          return res.status(400).json({ success: false, message: 'All fields are required.' });
      }
      
      

      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ success: false, message: 'User with this email already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ fullname, email, phoneNumber, password: hashedPassword,  });
      await user.save();

      res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
});

// Login Route
userRouter.post('/login', async (req, res) => {
    const { email, password,  } = req.body;

    try {
        // Validate required fields
        if (!email || !password ) {
            return res.status(400).json({ success: false, message: 'Email, password, and  are required.' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        // Verify password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        // Verify 
        
        // Generate JWT token with a 2-week expiration
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: TWO_WEEKS_IN_SECONDS
        });

        res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'An error occurred during login' });
    }
    console.log(res.data); // Add this line after the API call
    

});

export default userRouter;
