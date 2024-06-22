import request from 'supertest';
import { app } from '../../app';

it('user must logged in to create tickect', async () => {
    await request(app)
        .post('/api/concert/')
        .send({
            name: "test",
            price: 500
        })
        .expect(401);
});

it('required fields are empty', async () => {
    await request(app)
      .post('/api/concert')
      .set('Cookie', global.signin())
      .send({})
      .expect(400);
});

it('price must be number', async () => {
    await request(app)
      .post('/api/concert')
      .set('Cookie', global.signin())
      .send({
        name: "test",
        price: "tetststs",
      })
      .expect(400);
})

it('concert successfuly created', async () => {
    await request(app)
      .post('/api/concert')
      .set('Cookie', global.signin())
      .send({
        name: "test",
        price: 20,
      })
      .expect(201);
});