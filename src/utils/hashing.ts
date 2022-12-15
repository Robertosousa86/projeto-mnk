import { createHmac } from 'node:crypto';
import dotenv from 'dotenv';

dotenv.config();

const hashing = (data: string): string => {
  const secret = process.env.SECRET;

  return createHmac('sha256', secret).update(data).digest('hex');
};

export default hashing;
