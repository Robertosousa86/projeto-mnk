import { Router } from 'express';
import { CreateEmployeeController } from './controllers/CreateEmployee';

const createEmployee = new CreateEmployeeController();

const routes = Router();

routes.post('/employees', createEmployee.handle);

export { routes };
