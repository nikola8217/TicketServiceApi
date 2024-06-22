import request from 'supertest';
import { app } from '../../app';

it('user must be logged in to buy a ticket', async () => {
    await request(app)
        .post(`/api/concert/buyTicket/65d9e9ab338dd02598acba21`)
        .send({
            quantity: 5
        })
        .expect(401);
});

it('concert does not exists', async () => {
    const response = await request(app)
      .post('/api/concert')
      .set('Cookie', global.signin())
      .send({
        name: "test",
        price: 20,
      })
      .expect(201);

    await request(app)
    .post(`/api/concert/buyTicket/65d9e9ab338dd02598acba21`)
    .set('Cookie', global.signin())
    .send({
        quantity: 5
    })
    .expect(400);
});

it('required fielads are empty', async () => {
    const response = await request(app)
      .post('/api/concert')
      .set('Cookie', global.signin())
      .send({
        name: "test",
        price: 20,
      })
      .expect(201);

    await request(app)
    .post(`/api/concert/buyTicket/${response.body._id}`)
    .set('Cookie', global.signin())
    .send({})
    .expect(400);
});

it('quantity must be number', async () => {
    const response = await request(app)
      .post('/api/concert')
      .set('Cookie', global.signin())
      .send({
        name: "test",
        price: 20,
      })
      .expect(201);

    await request(app)
    .post(`/api/concert/buyTicket/${response.body._id}`)
    .set('Cookie', global.signin())
    .send({
        quantity: 'idsuab'
    })
    .expect(400);
});

it('ticket is successfuly bought', async () => {
    const response = await request(app)
        .post('/api/concert')
        .set('Cookie', global.signin())
        .send({
        name: "test",
        price: 20,
        })
        .expect(201);

    await request(app)
        .post(`/api/concert/buyTicket/${response.body._id}`)
        .set('Cookie', global.signin())
        .send({
            quantity: 5
        })
        .expect(200);
});