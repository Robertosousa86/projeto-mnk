import request from 'supertest';
import { appDataSource } from '../src/config/data-source';
import { EmployeeType } from '../src/controllers/types/EmployeeType';
import { Employee } from '../src/entities/Employee';
import app from '../src/app';

beforeAll(async () => {
  await appDataSource.initialize();
});

afterAll(async () => {
  await appDataSource.getRepository(Employee).delete({ name: 'Tica' });

  await appDataSource.destroy();
});

describe('Employee registration', () => {
  const fakeEmployee: EmployeeType = {
    name: 'Tica',
    cpf_employee: '12345678901',
    password: '123456',
  };

  const postEmployee = (employee = fakeEmployee): request.Test => {
    const route = request(app).post('/employees');

    return route.send(employee);
  };

  it('Should be return "200 OK" and "Employee registered." when create request is valid.', async () => {
    const result = await postEmployee();

    expect(result.statusCode).toBe(200);

    expect(result.body.message).toEqual('Employee registered.');
  });

  it('Should saves the employee to database.', async () => {
    const repository = appDataSource.getRepository(Employee);

    const queryResult = await repository.find();

    expect(queryResult.length).toEqual(1);
  });

  it('Should be return "400 bad request" when create request is invalid.', async () => {
    const result = await postEmployee({
      name: '',
      cpf_employee: '',
      password: '',
    });

    expect(result.statusCode).toEqual(400);
  });

  it('Should be return "Name field is required." when user field is empty.', async () => {
    const result = await postEmployee({
      name: '',
      cpf_employee: '12345678901',
      password: '123456',
    });

    expect(result.body.message).toEqual('Name field is required.');
  });

  it('Should be return "CPF field is required." when CPF field is empty.', async () => {
    const result = await postEmployee({
      name: 'Tica',
      cpf_employee: '',
      password: '123456',
    });

    expect(result.body.message).toBe('CPF field is required.');
  });

  it('Should be return "Password field is required." when password field is empty.', async () => {
    const result = await postEmployee({
      name: 'Tica',
      cpf_employee: '12345678901',
      password: '',
    });

    expect(result.body.message).toBe('Password field is required.');
  });

  it('Should be return "CPF already registered." when CPF is already registered.', async () => {
    const result = await postEmployee();

    expect(result.body.message).toEqual('CPF already registered.');
  });

  it('Should be Hashes the CPF in the database.', async () => {
    const repository = appDataSource.getRepository(Employee);

    const queryResult = await repository.find();

    expect(queryResult[0].cpf_employee).not.toEqual(fakeEmployee.cpf_employee);
  });

  it('Should be Hashes the password in the database.', async () => {
    const repository = appDataSource.getRepository(Employee);

    const queryResult = await repository.find();

    expect(queryResult[0].password).not.toEqual(fakeEmployee.password);
  });
});
