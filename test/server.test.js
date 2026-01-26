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

    it('GET /students should return list of students and handle caching', async () => {
        // Initial state
        let res = await request(app).get('/students');
        expect(res.statusCode).toEqual(200);
        // Note: Global state might be affected by other tests if any added students,
        // but currently no other tests add students.
        const initialCount = res.body.length;

        // Add a student
        const newStudent = { name: 'Cache Test', email: 'cache@test.com' };
        res = await request(app)
            .post('/students')
            .send(newStudent);
        expect(res.statusCode).toEqual(201);

        // Fetch again (should be fresh/invalidated cache)
        res = await request(app).get('/students');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(initialCount + 1);
        expect(res.body[res.body.length - 1].name).toEqual('Cache Test');

        // Fetch again (should be cached)
        res = await request(app).get('/students');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(initialCount + 1);
        expect(res.body[res.body.length - 1].name).toEqual('Cache Test');
    });
});
