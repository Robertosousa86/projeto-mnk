import { Request, Response } from 'express';
import { CreateEmployee } from '../services/CreateEmployee';

export class CreateEmployeeController {
  async handle(req: Request, res: Response) {
    const { name, user_name, password } = req.body;

    const service = new CreateEmployee();

    const responseResult = await service.execute({ name, user_name, password });

    return res.json(responseResult);
  }
}
