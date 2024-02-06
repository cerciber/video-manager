// Imports
const request = require('supertest');
const { describe, test, expect } = require('@jest/globals');
const { express } = require('@src/frameworks/web/express/express');
const paths = require('@src/utils/statics/paths');
const {
  validateResponse,
} = require('@src/adapters/controllers/validation/validationFunctions');

describe(`${paths.authSignIn.path}`, () => {
  test('Should autenticate user on system', async () => {
    const response = await request(express)
      .post(paths.authSignIn.path)
      .send({
        username: 'admin1',
        password: '123456789',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(200, response.body, 'Token').valid).toBe(true);
  });

  test('Should not autenticate user on system by bad request', async () => {
    const response = await request(express)
      .post(paths.authSignIn.path)
      .send({
        usernme: 'admin1',
        password: '123456789',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(400, response.body).valid).toBe(true);
  });

  test('Should not autenticate user on system by not exisiting user', async () => {
    const response = await request(express)
      .post(paths.authSignIn.path)
      .send({
        username: 'admin999',
        password: '123456789',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(404, response.body).valid).toBe(true);
  });

  test('Should register user on system', async () => {
    const response = await request(express)
      .post(paths.authSignUp.path)
      .send({
        username: 'common100',
        password: '7Y87YH8GG6Y8',
        name: 'Julian',
        email: 'julian@gmail.com',
        cellphone: '+573450985634',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(201, response.body, 'UserSiginUp').valid).toBe(
      true
    );
  });

  test('Should not register user on system by bad request', async () => {
    const response = await request(express)
      .post(paths.authSignUp.path)
      .send({
        username: 'common100',
        password: '7Y87YH8GG6Y8',
        name: 'Julian',
        email: 'julian@gmail.com',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(400, response.body).valid).toBe(true);
  });

  test('Should not register user on system by existing data', async () => {
    const response = await request(express)
      .post(paths.authSignUp.path)
      .send({
        username: 'admin1',
        password: '7Y87YH8GG6Y8',
        name: 'Julian',
        email: 'julian@gmail.com',
        cellphone: '+573450985634',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(409, response.body).valid).toBe(true);
  });
});
