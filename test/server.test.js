const request = require('supertest');
const app = require('../server');

describe('Student API', () => {
    // Reset data if possible, but since it's in-memory and module scope,
    // we can't easily reset without reloading the module or adding a reset endpoint.
    // For now, we assume the server starts fresh or we handle state accumulation.
    // Ideally we'd modify server.js to allow resetting, but I shouldn't modify it for tests only if possible.
    // Actually, Jest re-requires modules if we use jest.resetModules(), but app is exported as a const.
    // We will just verify behavior assuming sequential execution.

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

    it('should create a student and retrieve it', async () => {
        const newStudent = { name: 'John Doe', email: 'john@example.com' };

        // Create
        const postRes = await request(app)
            .post('/students')
            .send(newStudent);
        expect(postRes.statusCode).toEqual(201);
        expect(postRes.body.name).toEqual(newStudent.name);
        expect(postRes.body.id).toBeDefined();

        // Retrieve
        const getRes = await request(app).get('/students');
        expect(getRes.statusCode).toEqual(200);
        expect(Array.isArray(getRes.body)).toBeTruthy();
        const created = getRes.body.find(s => s.email === newStudent.email);
        expect(created).toBeDefined();
        expect(created.name).toEqual(newStudent.name);
    });

    it('should handle multiple students correctly', async () => {
        const student1 = { name: 'Alice', email: 'alice@example.com' };
        const student2 = { name: 'Bob', email: 'bob@example.com' };

        await request(app).post('/students').send(student1);

        let res = await request(app).get('/students');
        expect(res.body.some(s => s.email === 'alice@example.com')).toBeTruthy();

        await request(app).post('/students').send(student2);

        res = await request(app).get('/students');
        expect(res.body.some(s => s.email === 'alice@example.com')).toBeTruthy();
        expect(res.body.some(s => s.email === 'bob@example.com')).toBeTruthy();
    });
});
