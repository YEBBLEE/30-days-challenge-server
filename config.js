import dotenv from 'dotenv';

dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`process.env.${key} is null `);
  }
  return value;
}
export const config = {
  jwt: {
    secretKey: required('JWT_SECRET'),
    expireInSec: parseInt(required('JWT_EXPIRES_SEC', 86400))
  },
  bcrypt : {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS',12))
  }
}