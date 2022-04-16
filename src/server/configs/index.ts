import path from 'path';
import dotenv from 'dotenv';

console.log(process.env.NODE_ENV);

console.log(
  path.join(
    __dirname,
    `../../../.env${
      process.env.NODE_ENV === 'development' ? '.development' : ''
    }`
  )
);

dotenv.config({ path: path.join(__dirname, '../../../.env.development') });

const {
  PORT,
  SECRET_CODE,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_HOST,
  APP_NAME,
} = process.env;

const Configs = {
  PORT,
  SECRET_CODE,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_HOST,
  APP_NAME,
};

export default Configs;
