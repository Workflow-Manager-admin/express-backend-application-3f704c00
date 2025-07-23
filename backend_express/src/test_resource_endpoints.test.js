const request = require('supertest');
const app = require('./app');
const resourceService = require('./services/resource');

describe('Health Endpoint', () => {
  it('GET / should return health status with correct shape', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('message', 'Service is healthy');
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('environment');
    expect(typeof res.body.timestamp).toBe('string');
    expect(typeof res.body.environment).toBe('string');
  });
});

describe('Resource CRUD Endpoints', () => {
  beforeEach(() => {
    resourceService.reset();
  });

  describe('GET /resource', () => {
    it('should return empty array initially', async () => {
      const res = await request(app).get('/resource');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });

    it('should return array of resources after creation', async () => {
      // Create a resource first
      await request(app)
        .post('/resource')
        .send({ name: 'Test Resource', extra: 'field' })
        .set('Content-Type', 'application/json');
      const res = await request(app).get('/resource');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toHaveProperty('name', 'Test Resource');
      expect(res.body[0]).toHaveProperty('id');
    });
  });

  describe('POST /resource', () => {
    it('should create and return a resource (201)', async () => {
      const res = await request(app)
        .post('/resource')
        .send({ name: 'Foo' })
        .set('Content-Type', 'application/json');
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('name', 'Foo');
      expect(res.body).toHaveProperty('id');
    });

    it('should accept any non-empty body, even extra fields', async () => {
      const res = await request(app)
        .post('/resource')
        .send({ foo: 'bar', baz: 1 })
        .set('Content-Type', 'application/json');
      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchObject({ foo: 'bar', baz: 1 });
      expect(res.body).toHaveProperty('id');
    });

    it('should create a resource with no fields and just id if empty object', async () => {
      const res = await request(app)
        .post('/resource')
        .send({})
        .set('Content-Type', 'application/json');
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
    });
  });

  describe('GET /resource/:id', () => {
    it('should get an existing resource by id', async () => {
      const createRes = await request(app)
        .post('/resource')
        .send({ name: 'Res' });
      const id = createRes.body.id;
      const res = await request(app).get(`/resource/${id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', id);
      expect(res.body).toHaveProperty('name', 'Res');
    });

    it('should return 404 for nonexistent id', async () => {
      const res = await request(app).get('/resource/9999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Resource not found');
    });
  });

  describe('PUT /resource/:id', () => {
    it('should update and return updated resource if exists', async () => {
      const createRes = await request(app).post('/resource').send({ a: 1, b: 2 });
      const id = createRes.body.id;
      const res = await request(app)
        .put(`/resource/${id}`)
        .send({ a: 2, c: 3 })
        .set('Content-Type', 'application/json');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', id);
      expect(res.body).toMatchObject({ a: 2, b: 2, c: 3 });
    });

    it('should return 404 when updating non-existent resource', async () => {
      const res = await request(app)
        .put('/resource/404')
        .send({ x: 1 });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Resource not found');
    });
  });

  describe('DELETE /resource/:id', () => {
    it('should delete an existing resource (204) and then not find it', async () => {
      const createRes = await request(app).post('/resource').send({ z: 11 });
      const id = createRes.body.id;
      const delRes = await request(app).delete(`/resource/${id}`);
      expect(delRes.statusCode).toBe(204);

      // After delete, should return 404
      const getRes = await request(app).get(`/resource/${id}`);
      expect(getRes.statusCode).toBe(404);
    });

    it('should return 404 on delete for non-existing resource', async () => {
      const delRes = await request(app).delete('/resource/111111');
      expect(delRes.statusCode).toBe(404);
      expect(delRes.body).toHaveProperty('message', 'Resource not found');
    });
  });
});
