import { appDataSource } from '../config/data-source';
import { Employee } from '../entities/Employee';
import { EmployeeType } from '../controllers/types/EmployeeType';
import hashing from '../utils/hashing';

export class CreateEmployee {
  async execute(employeeType: EmployeeType): Promise<Employee | Error> {
    const repository = appDataSource.getRepository(Employee);

    const employee = repository.create(employeeType);

    if (!employee.name) return new Error('Name field is required.');

    if (!employee.cpf_employee) return new Error('CPF field is required.');

    if (!employee.password) return new Error('Password field is required.');

    employee.cpf_employee = hashing(employee.cpf_employee);

    employee.password = hashing(employee.password);

    const queryResult = await repository.findOne({
      where: { cpf_employee: employee.cpf_employee },
    });

    if (queryResult) return new Error('CPF already registered.');

    await repository.save(employee);
  }
}
