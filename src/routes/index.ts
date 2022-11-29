import express, { Request, Response } from 'express';
import employeeRoutes from './employee';

const router = express.Router();

router.use('/', employeeRoutes);

export default router;
