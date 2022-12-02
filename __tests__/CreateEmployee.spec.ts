import request from 'supertest';
import { appDataSource } from '../src/config/data-source';
import { EmployeeType } from '../src/controllers/types/EmployeeType';
import app from '../src/app';

const fakeEmployee: EmployeeType = {
  name: 'Tica',
  user_name: 'Tica',
  password: '123456',
};

beforeEach(async () => {
  await appDataSource.initialize();
});

afterEach(async () => {
  await appDataSource
    .destroy()
    .then(() => console.log('Connection was closed.'));
});

describe('Employee registration', () => {
  it.skip('Should be return "200 OK" when create request is valid.', async () => {
    const result = await request(app).post('/employees').send(fakeEmployee);

    expect(result.statusCode).toEqual(200);
  });

  it('Should be return "400 bad request" when create request is invalid.', async () => {
    const result = await request(app).post('/employees').send(fakeEmployee);

    expect(result.statusCode).toEqual(400);
  });

  it('Should be return "User name already exists." when user name is already registered.', async () => {
    const fakeEmployee: EmployeeType = {
      name: 'Tica',
      user_name: 'Tica',
      password: '123456',
    };

    const result = await request(app).post('/employees').send(fakeEmployee);

    expect(result.body.message).toEqual('User name already exists.');
  });

  it('Should be return "User field is required." when user field is empty.', async () => {
    const fakeEmployee: EmployeeType = {
      name: '',
      user_name: 'Tica',
      password: '123456',
    };

    const result = await request(app).post('/employees').send(fakeEmployee);

    expect(result.body.message).toBe('User field is required.');
  });

  it('Should be return "User Name field is required." when user_name field is empty.', async () => {
    const fakeEmployee: EmployeeType = {
      name: 'Tica',
      user_name: '',
      password: '123456',
    };

    const result = await request(app).post('/employees').send(fakeEmployee);

    expect(result.body.message).toBe('User Name field is required.');
  });

  it('Should be return "User Name field is required." when password field is empty.', async () => {
    const fakeEmployee: EmployeeType = {
      name: 'Tica',
      user_name: 'Tica',
      password: '',
    };

    const result = await request(app).post('/employees').send(fakeEmployee);

    expect(result.body.message).toBe('Password field is required.');
  });
});
