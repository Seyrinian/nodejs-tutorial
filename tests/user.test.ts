import request from 'supertest';
import { app, stopServer } from '../src';
import { prismaMock } from './jest.setup';
import jwt from 'jsonwebtoken';

afterAll(() => {
  stopServer();
});

describe('GET /users', () => {
  it('should return an array of users', async () => {
    prismaMock.user.findMany.mockResolvedValue([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);

    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  });

  it('should return an empty array if there are no users', async () => {
    prismaMock.user.findMany.mockResolvedValue([]);

    const response = await request(app).get('/users');

    expect(response.status).toBe(204);
  });
});

describe('GET /users/:userId', () => {
  it('should return a user by id', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      name: 'Alice',
    });

    const response = await request(app).get('/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: 'Alice' });
  });

  it('should return 404 if user is not found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const response = await request(app).get('/users/1');

    expect(response.status).toBe(404);
    expect(response.text).toBe('Utilisateur non trouvé');
  });
});

describe('POST /users', () => {
  it('should create a user', async () => {
    // Génération d'un jeton JWT valide
    const token = jwt.sign({ userId: '123' }, 'SECRET_TOKEN');
    prismaMock.user.create.mockResolvedValue({
      id: 1,
      name: 'Alice',
    });

    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`); // Ajout du jeton d'autorisation.send({ name: 'Alice' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1, name: 'Alice' });
  });
});
