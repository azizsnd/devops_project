const request = require('supertest');
const app = require('../server');

describe('Student API', () => {
    it('GET /health should return 200', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ status: 'healthy' });
    });

    it('POST /students should require name', async () => {
        const res = await request(app)
            .post('/students')
            .send({ email: 'test@test.com' }); // Missing name
        expect(res.statusCode).toEqual(400);
    });
});
