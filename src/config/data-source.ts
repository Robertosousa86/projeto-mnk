import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization.', err);
  });
