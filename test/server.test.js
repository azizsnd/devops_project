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

    it('POST /students should create a student', async () => {
        const res = await request(app)
            .post('/students')
            .send({ name: 'John Doe', email: 'john@example.com' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toEqual('John Doe');
    });

    it('GET /students should return list of students', async () => {
        // Create a student first to ensure list is not empty
        await request(app)
            .post('/students')
            .send({ name: 'Jane Doe', email: 'jane@example.com' });

        const res = await request(app).get('/students');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
        const student = res.body.find(s => s.email === 'jane@example.com');
        expect(student).toBeDefined();
    });
});
