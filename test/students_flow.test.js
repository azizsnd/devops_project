const request = require('supertest');
const app = require('../server');

describe('Student API Flow with Caching', () => {
    it('should correctly invalidate cache on updates', async () => {
        // 1. Initial state
        let res = await request(app).get('/students');
        expect(res.statusCode).toEqual(200);
        // Note: other tests or server startup might have populated it if not isolated?
        // server.js has `const students = []` at top level.
        // Jest re-requires modules but if app is exported instance, state might persist if not careful.
        // But here we are just checking if it updates.
        const initialCount = res.body.length;

        // 2. Add a student
        const newStudent = { name: 'Cache Test', email: 'cache@test.com' };
        res = await request(app).post('/students').send(newStudent);
        expect(res.statusCode).toEqual(201);

        // 3. Verify update
        res = await request(app).get('/students');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(initialCount + 1);
        expect(res.body[initialCount].name).toEqual('Cache Test');

        // 4. Add another student
        const newStudent2 = { name: 'Cache Test 2', email: 'cache2@test.com' };
        res = await request(app).post('/students').send(newStudent2);
        expect(res.statusCode).toEqual(201);

        // 5. Verify second update
        res = await request(app).get('/students');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(initialCount + 2);
        expect(res.body[initialCount + 1].name).toEqual('Cache Test 2');
    });
});
