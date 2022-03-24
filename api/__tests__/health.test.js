const request = require('supertest')('http://localhost:3000');

describe('Test healthcheck path', () => {
  test('It should response the GET method', () =>
    request.get('/healthz').then((response) => {
      expect(response.statusCode).toBe(200);
    }));
});
