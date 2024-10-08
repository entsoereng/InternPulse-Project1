const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');
const userRouters = require('../routes/users');  // Adjust the path accordingly

const app = express();
app.use(express.json());
app.use('/users', userRouters);

jest.setTimeout(60000);

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create({
        instance: {
            port: 27017,
            timeoutMS: 30000,
        },
    });
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
});


describe('User Routes', () => {
    // Tests for POST /users
    describe('POST /users', () => {
        it('should create a new user', async () => {
            const res = await request(app)
                .post('/users')
                .send({ name: 'Emmanuel Ntsoereng' });

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('name', 'Emmanuel Ntsoereng');
        });

        it('should return 400 if name is missing', async () => {
            const res = await request(app)
                .post('/users')
                .send({});

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('message', 'User name is required');
        });
    });

    // Tests for GET /users
    describe('GET /users', () => {
        beforeEach(async () => {
            await request(app).post('/users').send({ name: 'Phoka' });
            await request(app).post('/users').send({ name: 'Leseli' });
        });

        it('should retrieve and sort users by name', async () => {
            const res = await request(app)
                .get('/users')
                .query({ sortBy: 'name', sortOrder: 'asc' });

            expect(res.status).toBe(200);
            expect(res.body[0]).toHaveProperty('name', 'Phoka');
            expect(res.body[1]).toHaveProperty('name', 'Leseli');
        });

        it('should return 404 if no users are found', async () => {
            await request(app).delete('/users').query({ name: 'Phoka' });
            await request(app).delete('/users').query({ name: 'Leseli' });

            const res = await request(app).get('/users');
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('message', 'No users found');
        });
    });

    // Tests for GET /users/:id
    describe('GET /users/:id', () => {
        let userId;

        beforeEach(async () => {
            const res = await request(app).post('/users').send({ name: 'Letlotlo' });
            userId = res.body._id;
        });

        it('should retrieve user by ID', async () => {
            const res = await request(app).get(`/users/${userId}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', 'Letlotlo');
        });

        it('should return 404 if user not found', async () => {
            const res = await request(app).get('/users/invalidId');
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('message', 'User not found');
        });
    });

    // Tests for PUT /users
    describe('PUT /users', () => {
        let userId;

        beforeEach(async () => {
            const res = await request(app).post('/users').send({ name: 'Mpine' });
            userId = res.body._id;
        });

        it('should update user by name', async () => {
            const res = await request(app)
                .put('/users')
                .query({ oldName: 'Mpine' })
                .send({ name: 'Seilatsatsi' });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', 'Seilatsatsi');
        });

        it('should return 400 if old name or new name is missing', async () => {
            const res = await request(app)
                .put('/users')
                .query({ oldName: 'Mpine' })
                .send({});

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('message', 'Old name and new name are required');
        });
    });

    // Tests for PUT /users/:id
    describe('PUT /users/:id', () => {
        let userId;

        beforeEach(async () => {
            const res = await request(app).post('/users').send({ name: 'Emma' });
            userId = res.body._id;
        });

        it('should update user by ID', async () => {
            const res = await request(app)
                .put(`/users/${userId}`)
                .send({ name: 'Emily' });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', 'Emily');
        });

        it('should return 400 if new name is missing', async () => {
            const res = await request(app)
                .put(`/users/${userId}`)
                .send({});

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('message', 'New name is required');
        });
    });

    // Tests for DELETE /users
    describe('DELETE /users', () => {
        beforeEach(async () => {
            await request(app).post('/users').send({ name: 'Frank' });
        });

        it('should delete user by name', async () => {
            const res = await request(app).delete('/users').query({ name: 'Frank' });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'User deleted successfully');
        });

        it('should return 400 if user name is missing', async () => {
            const res = await request(app).delete('/users').send({});
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('message', 'User name is required');
        });
    });

    // Tests for DELETE /users/:id
    describe('DELETE /users/:id', () => {
        let userId;

        beforeEach(async () => {
            const res = await request(app).post('/users').send({ name: 'Grace' });
            userId = res.body._id;
        });

        it('should delete user by ID', async () => {
            const res = await request(app).delete(`/users/${userId}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'User deleted successfully');
        });

        it('should return 404 if user not found', async () => {
            const res = await request(app).delete('/users/invalidId');
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('message', 'User not found');
        });
    });
});
