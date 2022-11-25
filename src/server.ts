import dotenv from 'dotenv';
import { setupApp } from '../src/app';

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;

try {
  const app = setupApp();
  app.listen(PORT, () => {
    console.log('Server is running.');
  });
} catch (err) {
  console.error('Error: ', err);
}
