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
    user_name: 'Tica',
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
      user_name: '',
      password: '',
    });

    expect(result.statusCode).toEqual(400);
  });

  it('Should be return "Name field is required." when user field is empty.', async () => {
    const result = await postEmployee({
      name: '',
      user_name: 'Tica',
      password: '123456',
    });

    expect(result.body.message).toEqual('User field is required.');
  });

  it('Should be return "User Name field is required." when user_name field is empty.', async () => {
    const result = await postEmployee({
      name: 'Tica',
      user_name: '',
      password: '123456',
    });

    expect(result.body.message).toBe('User Name field is required.');
  });

  it('Should be return "Password field is required." when password field is empty.', async () => {
    const result = await postEmployee({
      name: 'Tica',
      user_name: 'Tica',
      password: '',
    });

    expect(result.body.message).toBe('Password field is required.');
  });

  it('Should be return "User name already exists." when user name is already registered.', async () => {
    const result = await postEmployee();

    expect(result.body.message).toEqual('User name already exists.');
  });
});
