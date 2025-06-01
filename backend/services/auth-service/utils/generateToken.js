import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const generateAccessToken = (user) => {
  if (!JWT_SECRET) throw new Error('JWT secret not defined');
  return jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: '30m' } 
  );
};

export const generateRefreshToken = (user) => {
  if (!REFRESH_TOKEN_SECRET) throw new Error('Refresh token secret not defined');
  return jwt.sign(
    { id: user._id },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};
