import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_EXPIRES_IN = '7d'
export const generateAccessToken = (user: object) => {
    return jwt.sign({ ...user }, 'ACCESS_TOKEN_SECRET', {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
  };