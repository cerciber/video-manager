// Imports
const request = require('supertest');
const { describe, test, expect } = require('@jest/globals');
const { express } = require('@src/frameworks/web/express/express');
const paths = require('@src/utils/statics/paths');
const config = require('@src/utils/statics/config');
const {
  validateResponse,
} = require('@src/adapters/controllers/validation/validationFunctions');

describe(`${paths.videos.path}`, () => {
  test('Should get all videos', async () => {
    const response = await request(express)
      .get(paths.videos.path)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`);
    expect(validateResponse(200, response.body, 'Videos').valid).toBe(true);
  });

  test('Should not get all videos by unauthorized', async () => {
    const response = await request(express).get(paths.videos.path);
    expect(validateResponse(401, response.body).valid).toBe(true);
  });

  test('Should not add video by bad request', async () => {
    const response = await request(express)
      .post(paths.videos.path)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`)
      .send({
        userId: 1,
        titlsssse: 'Video 1',
        description: 'Description video 1',
        credits: 'Credit 1, Credit 2',
        isPrivate: true,
      })
      .set('Accept', 'application/json');
    expect(validateResponse(400, response.body).valid).toBe(true);
  });

  test('Should not add video by unauthorized', async () => {
    const response = await request(express)
      .post(paths.videos.path)
      .send({
        userId: 1,
        title: 'Video 1',
        description: 'Description video 1',
        credits: 'Credit 1, Credit 2',
        isPrivate: true,
      })
      .set('Accept', 'application/json');
    expect(validateResponse(401, response.body).valid).toBe(true);
  });

  test('Should get video by id', async () => {
    const response = await request(express)
      .get(`${paths.videos.path}/5`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`);
    expect(validateResponse(200, response.body, 'Video').valid).toBe(true);
  });

  test('Should not get video by id by bad request', async () => {
    const response = await request(express)
      .get(`${paths.videos.path}/sdads`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`);
    expect(validateResponse(400, response.body).valid).toBe(true);
  });

  test('Should not get video by id by unauthorized', async () => {
    const response = await request(express).get(`${paths.videos.path}/1`);
    expect(validateResponse(401, response.body).valid).toBe(true);
  });

  test('Should not get video by id by non exisiting data', async () => {
    const response = await request(express)
      .get(`${paths.videos.path}/9999`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`);
    expect(validateResponse(404, response.body).valid).toBe(true);
  });

  test('Should update video', async () => {
    const response = await request(express)
      .patch(`${paths.videos.path}/5`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`)
      .send({
        title: 'Title 2',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(200, response.body, 'Video').valid).toBe(true);
  });

  test('Should not update video by bad request', async () => {
    const response = await request(express)
      .patch(`${paths.videos.path}/5`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`)
      .send({
        titleeee: 'Title 2',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(400, response.body).valid).toBe(true);
  });

  test('Should not update video by unauthorized', async () => {
    const response = await request(express)
      .patch(`${paths.videos.path}/5`)
      .send({
        title: 'Title 2',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(401, response.body).valid).toBe(true);
  });

  test('Should not update video by non existing data', async () => {
    const response = await request(express)
      .patch(`${paths.videos.path}/9999`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`)
      .send({
        title: 'Title 2',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(404, response.body).valid).toBe(true);
  });

  test('Should delete video', async () => {
    const response = await request(express)
      .delete(`${paths.videos.path}/5`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`);
    expect(validateResponse(200, response.body).valid).toBe(true);
  });

  test('Should not delete video by bad request', async () => {
    const response = await request(express)
      .delete(`${paths.videos.path}/asdas`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`);
    expect(validateResponse(400, response.body).valid).toBe(true);
  });

  test('Should not delete video by unauthorized', async () => {
    const response = await request(express).delete(`${paths.videos.path}/5`);
    expect(validateResponse(401, response.body).valid).toBe(true);
  });

  test('Should not delete video by not existing data', async () => {
    const response = await request(express)
      .delete(`${paths.videos.path}/999`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`);
    expect(validateResponse(404, response.body).valid).toBe(true);
  });

  test('Should get my videos', async () => {
    const response = await request(express)
      .get(`${paths.ownVideos.path}`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`);
    expect(validateResponse(200, response.body, 'Videos').valid).toBe(true);
  });

  test('Should not get my videos by unauthorized', async () => {
    const response = await request(express).get(`${paths.ownVideos.path}`);
    expect(validateResponse(401, response.body).valid).toBe(true);
  });

  test('Should not update my video by bad request', async () => {
    const response = await request(express)
      .patch(`${paths.ownVideos.path}/6`)
      .set('Authorization', `Bearer ${config.application.testAdminToken}`)
      .send({
        titleeee: 'Title 2',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(400, response.body).valid).toBe(true);
  });

  test('Should not update my video by unauthorized', async () => {
    const response = await request(express)
      .patch(`${paths.ownVideos.path}/6`)
      .send({
        title: 'Title 2',
      })
      .set('Accept', 'application/json');
    expect(validateResponse(401, response.body).valid).toBe(true);
  });

  test('Should not delete my video by unauthorized', async () => {
    const response = await request(express).delete(`${paths.ownVideos.path}/5`);
    expect(validateResponse(401, response.body).valid).toBe(true);
  });
});
