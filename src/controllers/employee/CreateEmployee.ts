import { Request, Response } from 'express';
import { CreateEmployee } from '../../services/CreateEmployee';

export class CreateEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const employee = request.body;

    const service = new CreateEmployee();

    const serviceResult = await service.execute(employee);

    if (serviceResult instanceof Error)
      return response.status(400).json({ message: serviceResult.message });

    return response.status(200).send({ message: 'Employee registered.' });
  }
}
