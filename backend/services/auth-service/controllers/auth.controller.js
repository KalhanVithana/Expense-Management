import { User } from '../models/user.model.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
  const { email,username, password } = req.body;

  try {
     const existingUser = await User.findOne({
      $and: [{ username }, { email }]
    });

    if (existingUser) {
  if (existingUser.username === username) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  if (existingUser.email === email) {
    return res.status(400).json({ message: 'Email already exists' });
  }
}

    const user = await User.create({ email,username, password });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

 
    res.status(201).json({
      accessToken,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
       secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      accessToken,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: 'Login failed' });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    console.log("req",req);
    
    if (!token) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid refresh token' });

      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const newAccessToken = generateAccessToken(user._id);
      const newRefreshToken = generateRefreshToken(user._id);

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.json({ message: 'Logged out successfully' });
};
