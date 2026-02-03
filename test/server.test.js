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

    it('GET /students should return updated list (cache invalidation check)', async () => {
        // 1. Create first student
        await request(app)
            .post('/students')
            .send({ name: 'Alice', email: 'alice@example.com' });

        // 2. Get students (caches the result)
        const res1 = await request(app).get('/students');
        const alice = res1.body.find(s => s.name === 'Alice');
        expect(alice).toBeDefined();

        // 3. Create second student (should invalidate cache)
        await request(app)
            .post('/students')
            .send({ name: 'Bob', email: 'bob@example.com' });

        // 4. Get students again (should get fresh list)
        const res2 = await request(app).get('/students');
        const bob = res2.body.find(s => s.name === 'Bob');
        expect(bob).toBeDefined();
        expect(res2.body.length).toBeGreaterThanOrEqual(2);
    });
});
