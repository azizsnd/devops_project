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
            .send({ email: 'test@test.com' });
        expect(res.statusCode).toEqual(400);
    });

    it('should invalidate cache when a new student is added', async () => {
        // 1. Initial GET to populate cache
        const initialRes = await request(app).get('/students');
        expect(initialRes.statusCode).toEqual(200);
        const initialCount = initialRes.body.length;

        // 2. Add a student
        const newStudent = { name: 'Cache Test', email: 'cache@test.com' };
        await request(app).post('/students').send(newStudent).expect(201);

        // 3. GET again - should include the new student
        const finalRes = await request(app).get('/students');
        expect(finalRes.statusCode).toEqual(200);
        expect(finalRes.body.length).toEqual(initialCount + 1);
        expect(finalRes.body[finalRes.body.length - 1].name).toEqual('Cache Test');
    });
});
