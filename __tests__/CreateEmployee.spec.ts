import request from 'supertest';
import { appDataSource } from '../src/config/data-source';
import app from '../src/app';

beforeEach(async () => {
  await appDataSource.initialize();
});

afterEach(async () => {
  await appDataSource
    .destroy()
    .then(() => console.log('Connection was closed.'));
});

const fakeEmployee = {
  name: 'Tica',
  user_name: 'Tica',
  password: '123456',
};

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
    const result = await request(app).post('/employees').send(fakeEmployee);

    expect(result.body.message).toEqual('User name already exists.');
  });
});
