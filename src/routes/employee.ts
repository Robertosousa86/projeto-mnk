import { Router } from 'express';
import { CreateEmployeeController } from '../controllers/employee/CreateEmployee';

const createEmployee = new CreateEmployeeController();

const router = Router();

router.post('/employees', createEmployee.handle);

export default router;
