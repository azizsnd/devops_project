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

    it('POST /students should create a new student', async () => {
        const newStudent = { name: 'John Doe', email: 'john@example.com' };
        const res = await request(app)
            .post('/students')
            .send(newStudent);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toEqual(newStudent.name);
        expect(res.body.email).toEqual(newStudent.email);
    });

    it('GET /students should return list of students', async () => {
        const res = await request(app).get('/students');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('GET /students should return created student', async () => {
        const newStudent = { name: 'Jane Doe', email: 'jane@example.com' };
        await request(app).post('/students').send(newStudent);

        const res = await request(app).get('/students');
        expect(res.statusCode).toEqual(200);
        const student = res.body.find(s => s.email === 'jane@example.com');
        expect(student).toBeDefined();
        expect(student.name).toEqual('Jane Doe');
    });
});
