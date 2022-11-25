import express from 'express';
import { routes } from './routes';

const app = express();

export const setupApp = () => {
  app.use(express.json());
  app.use(routes);

  return app;
};
