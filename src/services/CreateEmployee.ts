import { appDataSource } from '../config/data-source';
import { Employee } from '../entities/Employee';
import { EmployeeType } from '../controllers/types/EmployeeType';

export class CreateEmployee {
  async execute(employeeType: EmployeeType): Promise<Employee | Error> {
    const repository = appDataSource.getRepository(Employee);

    const employee = repository.create(employeeType);

    if (!employee.name) return new Error('User field is required.');

    if (!employee.user_name) return new Error('User Name field is required.');

    if (!employee.password) return new Error('Password field is required.');

    const queryResult = await repository.findOne({
      where: { user_name: employee.user_name },
    });

    if (queryResult) return new Error('User name already exists.');

    await repository.save(employee);

    return employee;
  }
}
