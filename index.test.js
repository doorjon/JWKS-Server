const app = require('./index.js');
const supertest = require('supertest');

describe('Test functions', () => {
    test('returns an unexpired, signed JWT', async () => {
        const response = await request(app).post("/auth").send();
        expect(response.statusCode).toBe(200);
    })
  
    test('serves public keys in JWKS format', async () => {
        const response = await request(app).post("/.well-known/jwks.json").send();
        expect(response.statusCode).toBe(200);
    });
  
  });