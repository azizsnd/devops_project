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
        expect(res.body).toHaveProperty('error');
    });

    it('POST /students should create a student', async () => {
        const res = await request(app)
            .post('/students')
            .send({ name: 'John Doe', email: 'john@test.com' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toEqual('John Doe');
        expect(res.body.email).toEqual('john@test.com');
    });

    it('GET /students should return list of students', async () => {
        // Ensure at least one student exists from previous test
        const res = await request(app).get('/students');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);

        // Verify the student added in the previous test is present
        const student = res.body.find(s => s.email === 'john@test.com');
        expect(student).toBeDefined();
        expect(student.name).toEqual('John Doe');
    });
});
