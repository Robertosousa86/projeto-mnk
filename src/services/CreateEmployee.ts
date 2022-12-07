import { appDataSource } from '../config/data-source';
import { Employee } from '../entities/Employee';
import { EmployeeType } from '../controllers/types/EmployeeType';
import { createHmac } from 'node:crypto';

export class CreateEmployee {
  async execute(employeeType: EmployeeType): Promise<Employee | Error> {
    const repository = appDataSource.getRepository(Employee);

    const { name, user_name, password } = repository.create(employeeType);

    if (!name) return new Error('Name field is required.');

    if (!user_name) return new Error('User Name field is required.');

    if (!password) return new Error('Password field is required.');

    const queryResult = await repository.findOne({
      where: { user_name: user_name },
    });

    if (queryResult) return new Error('User name already exists.');

    const hashing = (): string => {
      return createHmac('sha256', password).update(password).digest('hex');
    };

    const employee = { name, user_name, password: hashing() };

    await repository.save(employee);
  }
}
