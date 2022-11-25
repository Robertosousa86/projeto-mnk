import { appDataSource } from '../config/data-source';
import { Employee } from '../entities/Employee';
import { EmployeeData } from '../controllers/types/Employee';

export class CreateEmployee {
  async execute(employeeRequest: EmployeeData): Promise<Employee> {
    const repository = appDataSource.getRepository(Employee);

    const employee = repository.create(employeeRequest);

    await repository.save(employee);

    return employee;
  }
}
