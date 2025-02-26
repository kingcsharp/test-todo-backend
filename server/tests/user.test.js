const request = require('supertest');
const app = require('../src/app');
const knex = require('../src/infrastructure/db/knex');

describe('User API Test', () => {
    afterAll(async () => {
        await knex.destroy();
    });

    let createdUserId;

    it('should be created a new user', async() => {
        const res = await request(app)
            .post('/api/users')
            .send({name: 'John Doe', email: 'john@example.com', organizationId: 1});

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');

        createdUserId = res.body.id;
    });
});