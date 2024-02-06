// Imports
const request = require('supertest');
const { describe, test, expect } = require('@jest/globals');
const { express } = require('@src/frameworks/web/express/express');
const paths = require('@src/utils/statics/paths');
const config = require('@src/utils/statics/config');
const {
  validateResponse,
} = require('@src/adapters/controllers/validation/validationFunctions');

describe(`${paths.users.path}`, () => {
  test('Should get all users', async () => {
    const response = await request(express)
      .get(paths.users.path)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`);
    expect(validateResponse(200, response.body, 'UsersSiginUp').valid).toBe(
      true
    );
  });

  test('Should not get all users by unauthorized', async () => {
    const response = await request(express).get(paths.users.path);
    expect(validateResponse(401, response.body).valid).toBe(true);
  });

  test('Should add user', async () => {
    const response = await request(express)
      .post(paths.users.path)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`)
      .send({
        username: 'felipe1',
        rol: 'common',
        password: 'EREERER$#$',
        name: 'Felipe',
        email: 'felipe@gmail.com',
        cellphone: '+5745609834',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(201, response.body, 'UserSiginUp').valid).toBe(
      true
    );
  });

  test('Should not add user by bad request', async () => {
    const response = await request(express)
      .post(paths.users.path)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`)
      .send({
        username: 'felipe1',
        rol: 'common',
        name: 'Felipe',
        email: 'felipe@gmail.com',
        cellphone: '+5745609834',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(400, response.body).valid).toBe(true);
  });

  test('Should not add user by unauthorized', async () => {
    const response = await request(express)
      .post(paths.users.path)
      .send({
        username: 'felipe1',
        rol: 'common',
        password: 'EREERER$#$',
        name: 'Felipe',
        email: 'felipe@gmail.com',
        cellphone: '+5745609834',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(401, response.body).valid).toBe(true);
  });

  test('Should not add user by existing data', async () => {
    const response = await request(express)
      .post(paths.users.path)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`)
      .send({
        username: 'admin1',
        rol: 'common',
        password: 'EREERER$#$',
        name: 'Felipe',
        email: 'felipe@gmail.com',
        cellphone: '+5745609834',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(409, response.body).valid).toBe(true);
  });

  test('Should get user by id', async () => {
    const response = await request(express)
      .get(`${paths.users.path}/1`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`);
    expect(validateResponse(200, response.body, 'UserSiginUp').valid).toBe(
      true
    );
  });

  test('Should not get user by id by bad request', async () => {
    const response = await request(express)
      .get(`${paths.users.path}/sdads`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`);
    expect(validateResponse(400, response.body).valid).toBe(true);
  });

  test('Should not get user by id by unauthorized', async () => {
    const response = await request(express).get(`${paths.users.path}/1`);
    expect(validateResponse(401, response.body).valid).toBe(true);
  });

  test('Should not get user by id by non exisiting data', async () => {
    const response = await request(express)
      .get(`${paths.users.path}/9999`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`);
    expect(validateResponse(404, response.body).valid).toBe(true);
  });

  test('Should update user', async () => {
    const response = await request(express)
      .patch(`${paths.users.path}/1`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`)
      .send({
        username: 'Pedro',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(200, response.body, 'UserSiginUp').valid).toBe(
      true
    );
  });

  test('Should not update by bad request', async () => {
    const response = await request(express)
      .patch(`${paths.users.path}/1`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`)
      .send({
        usernameeeee: 'Pedro',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(400, response.body).valid).toBe(true);
  });

  test('Should not update by unauthorized', async () => {
    const response = await request(express)
      .patch(`${paths.users.path}/1`)
      .send({
        username: 'Pedro',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(401, response.body).valid).toBe(true);
  });

  test('Should not update by non existing data', async () => {
    const response = await request(express)
      .patch(`${paths.users.path}/9999`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`)
      .send({
        username: 'Pedro',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(404, response.body).valid).toBe(true);
  });

  test('Should not update by existing data', async () => {
    const response = await request(express)
      .patch(`${paths.users.path}/1`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`)
      .send({
        username: 'common1',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(409, response.body).valid).toBe(true);
  });

  test('Should delete user', async () => {
    const response = await request(express)
      .delete(`${paths.users.path}/2`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`);
    expect(validateResponse(200, response.body).valid).toBe(true);
  });

  test('Should not delete user by bad request', async () => {
    const response = await request(express)
      .delete(`${paths.users.path}/asdas`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`);
    expect(validateResponse(400, response.body).valid).toBe(true);
  });

  test('Should not delete user by unauthorized', async () => {
    const response = await request(express).delete(`${paths.users.path}/asdas`);
    expect(validateResponse(401, response.body).valid).toBe(true);
  });

  test('Should not delete user by not existing data', async () => {
    const response = await request(express)
      .delete(`${paths.users.path}/999`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`);
    expect(validateResponse(404, response.body).valid).toBe(true);
  });

  test('Should get my user', async () => {
    const response = await request(express)
      .get(`${paths.ownUser.path}`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`);
    expect(validateResponse(200, response.body, 'UserSiginUp').valid).toBe(
      true
    );
  });

  test('Should not get my user by unauthorized', async () => {
    const response = await request(express).get(`${paths.ownUser.path}`);
    expect(validateResponse(401, response.body).valid).toBe(true);
  });

  test('Should update my user', async () => {
    const response = await request(express)
      .patch(`${paths.ownUser.path}`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`)
      .send({
        name: 'Pedro',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(200, response.body, 'UserSiginUp').valid).toBe(
      true
    );
  });

  test('Should not update my user by bad request', async () => {
    const response = await request(express)
      .patch(`${paths.ownUser.path}`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`)
      .send({
        nameeeee: 'Pedro',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(400, response.body).valid).toBe(true);
  });

  test('Should not update my user by unauthorized', async () => {
    const response = await request(express)
      .patch(`${paths.ownUser.path}`)
      .send({
        name: 'Pedro',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(401, response.body).valid).toBe(true);
  });

  test('Should not update my user by existing data', async () => {
    const response = await request(express)
      .patch(`${paths.ownUser.path}`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`)
      .send({
        username: 'common2',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(409, response.body).valid).toBe(true);
  });

  test('Should not delete my user by unauthorized', async () => {
    const response = await request(express).delete(`${paths.ownUser.path}`);
    expect(validateResponse(401, response.body).valid).toBe(true);
  });
});
