import request from 'supertest';
import { app, stopServer } from '../src';
import jwt from 'jsonwebtoken';

afterAll(() => {
  stopServer();
});

describe('POST /auth', () => {
  it('should return a valid token for correct credentials', async () => {
    const response = await request(app)
      .post('/auth')
      .send({ username: 'admin', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');

    // Vérification du token
    const decoded = jwt.verify(response.body.token, 'SECRET_TOKEN');
    expect(decoded).toHaveProperty('username', 'admin');
  });

  it('should return 401 for incorrect credentials', async () => {
    const response = await request(app)
      .post('/auth')
      .send({ username: 'admin', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.text).toBe('Identifiants invalides');
  });
});
