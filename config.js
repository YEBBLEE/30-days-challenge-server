import dotenv from 'dotenv';

dotenv.config();

export const config = {
  jwt: {
    secretKey: process.env.JWT_SECRET,
    expireInSec: parseInt(process.env.JWT_EXPIRES_SEC)
  },
  bcrypt : {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS)
  }
}