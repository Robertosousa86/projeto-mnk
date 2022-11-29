import dotenv from 'dotenv';
import app from '../src/app';

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;

try {
  app.listen(PORT, () => {
    console.log('Server is running.');
  });
} catch (err) {
  console.error('Error: ', err);
}
