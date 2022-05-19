import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as userRepo from '../data/auth.js';

const AUTH_ERROR = { message: 'Authentication Error'};

export const isAuth = async (req,res,next) => {
  console.log(req.headers);
  const authHeader = await req.get('Authorization');
  console.log(`authHeader ${authHeader}`);
  if(!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];
  console.log(`token: ${token}`);
  jwt.verify(
    token,
    config.jwt.secretKey,
    async (error, decoded) => {
      if(error) {
        console.log(error);
        return res.status(401).json(AUTH_ERROR);
      }
      const user = await userRepo.findById(decoded.id);
      if(!user) {
        return res.status(401).json(AUTH_ERROR);
      }
      req.userId = user.id;
      req.token = token;
      next();
    }
  )
}