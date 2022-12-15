import { Request, Response } from 'express';
import { CreateEmployee } from '../../services/CreateEmployee';

export class CreateEmployeeController {
  async handle(req: Request, res: Response) {
    const employee = req.body;

    const service = new CreateEmployee();

    const serviceResult = await service.execute(employee);

    if (serviceResult instanceof Error)
      return res.status(400).json({ message: serviceResult.message });

    return res.status(200).send({ message: 'Employee registered.' });
  }
}
