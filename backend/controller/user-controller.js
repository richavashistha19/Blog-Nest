import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Token from '../model/token.js'
import User from '../model/user.js';

dotenv.config();

export const signupUser = async (request, response) => {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = new User({ 
            username: request.body.username, 
            name: request.body.name, 
            password: hashedPassword 
        });
        await user.save();

        return response.status(200).json({ msg: 'Signup successful' });
    } catch (error) {
        console.error('Signup error:', error);
        return response.status(500).json({ msg: 'Signup failed' });
    }
};

export const loginUser = async (request, response) => {
    console.log("Request body:", request.body); // Log request body
  
    try {
      const { username, password } = request.body;
  
      if (!username || !password) {
        console.log("Missing username or password");
        return response.status(400).json({ isSuccess: false, msg: 'Username and password are required' });
      }
  
      const user = await User.findOne({ username });
      console.log("User found:", user); // Log user found
  
      if (!user) {
        console.log("User not found");
        return response.status(400).json({ isSuccess: false, msg: 'User not found' });
      }
  
      const match = await bcrypt.compare(password, user.password);
      console.log("Password match:", match); // Log password match status
  
      if (!match) {
        console.log("Incorrect password");
        return response.status(400).json({ isSuccess: false, msg: 'Password is incorrect' });
      }
  
      const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
      const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
  
      const newToken = new Token({ token: refreshToken });
      await newToken.save();
  
      return response.status(200).json({ isSuccess: true, accessToken, refreshToken, name: user.name, username: user.username });
    } catch (error) {
      console.error('Login error:', error);
      return response.status(500).json({ isSuccess: false, msg: 'Login failed' });
    }
};
