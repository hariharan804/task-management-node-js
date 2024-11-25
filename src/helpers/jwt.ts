
import jwt from 'jsonwebtoken';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'tasks-access-token-secretAQWER%$$3456';

// Access token expiry (e.g., 10 minutes)
const ACCESS_TOKEN_EXPIRES_IN = '1d';

// Function to generate access token
export const generateAccessToken = async (user: object) => {
  return await jwt.sign({ ...user }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

// Function to verify access token
export const verifyAccessToken = async (token: string) => {
  try {
    return await jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (err) {
    console.log('🚀 ~ verifyAccessToken ~ err:', err);
    return null;
  }
};

 