import request from 'supertest';
import { app } from '../../app';

it('returns 200 and cookie on successful login', async () => {
    await request(app)
        .post('/api/users/register')
        .send({
            name: 'test2',
            email: 'test2@gmail.com',
            password: '123456'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/login')
        .send({
            email: 'test2@gmail.com',
            password: '123456'
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns a 400 with empty required fields', async () => {
    await request(app)
        .post('/api/users/login')
        .send({})
        .expect(400);
});

it('returns a 400 if email not exists', async () => {
    await request(app)
        .post('/api/users/login')
        .send({
            email: 'test2@gmail.com',
            password: '123456'
        })
        .expect(400);
});

it('returns a 400 if password is invalid', async () => {
    await request(app)
        .post('/api/users/register')
        .send({
            name: 'test2',
            email: 'test2@gmail.com',
            password: '123456'
        })
        .expect(201);

    await request(app)
        .post('/api/users/login')
        .send({
            email: 'test2@gmail.com',
            password: '123456789'
        })
        .expect(400);
});