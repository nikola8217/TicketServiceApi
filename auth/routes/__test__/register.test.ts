import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful register', async () => {
    await request(app)
        .post('/api/users/register')
        .send({
            name: 'test2',
            email: 'test2@gmail.com',
            password: '123456'
        })
        .expect(201);
});

it('returns a 400 with empty required fields', async () => {
    await request(app)
        .post('/api/users/register')
        .send({})
        .expect(400);
});

it('returns a 400 with an invalid email', async () => {
    await request(app)
        .post('/api/users/register')
        .send({
            name: 'test2',
            email: 'test2',
            password: '123456'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    await request(app)
        .post('/api/users/register')
        .send({
            name: 'test2',
            email: 'test2',
            password: '1'
        })
        .expect(400);
});

it('email must be unique', async () => {
    await request(app)
        .post('/api/users/register')
        .send({
            name: 'test2',
            email: 'test2@gmail.com',
            password: '123456'
        })
        .expect(201);

    await request(app)
        .post('/api/users/register')
        .send({
            name: 'test2',
            email: 'test2@gmail.com',
            password: '123456'
        })
        .expect(400);
});

