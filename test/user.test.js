const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../userModels');

beforeAll(async () => {
    const mongoUri = process.env.MONGODB_URI;
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

afterEach(async () => {
    await User.deleteMany({});
});

describe('User API tests', () => {
    test('should create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send({ name: 'Mokonyana Ntsoereng' });

        expect(response.status).toBe(201);
        expect(response.body.newUser).toHaveProperty('_id');
        expect(response.body.newUser.name).toBe('Mokonyana Ntsoereng');
    });

    test('should retrieve user information by name', async () => {
        const user = new User({ name: 'Mokonyana Ntsoereng' });
        await user.save();

        const response = await request(app)
            .get('/users')
            .query({ name: 'Mokonyana Ntsoereng' });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Mokonyana Ntsoereng');
    });

    test('should retrieve user information by ID', async () => {
        const user = new User({ name: 'Emmanuel' });
        await user.save();

        const response = await request(app)
            .get(`/users/${user._id}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Emmanuel');
    });

    test('should update user information by name', async () => {
        const user = new User({ name: 'Phoka' });
        await user.save();

        const response = await request(app)
            .put('/users')
            .query({ name: 'Phoka' })
            .send({ newName: 'Letlotlo' });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Letlotlo');
    });

    test('should update user information by ID', async () => {
        const user = new User({ name: 'Leseli' });
        await user.save();

        const response = await request(app)
            .put(`/users/${user._id}`)
            .send({ newName: 'Lesedi' });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Lesedi');
    });

    test('should delete a user by name', async () => {
        const user = new User({ name: 'Mpine' });
        await user.save();

        const response = await request(app)
            .delete('/users')
            .query({ name: 'Mpine' });

        expect(response.status).toBe(204);
    });

    test('should delete a user by ID', async () => {
        const user = new User({ name: 'Lieketso' });
        await user.save();

        const response = await request(app)
            .delete(`/users/${user._id}`);

        expect(response.status).toBe(204);
    });
});
