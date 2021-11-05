const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('chat-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  test('signin and signup works', async () => {
    const authData = {
      username: 'bobb',
      password: 'bobb'
    };

    const signupRes = await request(app)
      .post('/users/signup')
      .send(authData);

    expect(signupRes.status).toEqual(200);
    expect(signupRes.body).toHaveProperty('token');
    expect(signupRes.body.username).toEqual('bobb');

    const signinRes = await request(app)
      .post('/users/signin')
      .send(authData);

    expect(signinRes.status).toEqual(200);
    expect(signinRes.body).toHaveProperty('token');
    expect(signinRes.body.username).toEqual('bobb');
  });

  test('GET rooms and POST rooms works', async () => {
    const userData = {
      username: 'bobb',
      password: 'bobb'
    };

    const signupRes = await request(app)
      .post('/users/signup')
      .send(userData);

    const { token } = signupRes.body;
    const postRoomRes = await request(app)
      .post('/api/v1/rooms/')
      .set('Authorization', token)
      .send({ name: 'bobs room' });

    const expected = { id: '1', name: 'bobs room' };
    expect(postRoomRes.body.room).toEqual(expected);

    const getRooms = await request(app)
      .get('/api/v1/rooms/')
      .set('Authorization', token);

    expect(getRooms.body.rooms).toContainEqual(expected);
  });

  test('GET messages and POST messages works', async () => {
    const userData = {
      username: 'bobb',
      password: 'bobb'
    };

    const testMessageText = 'hi im a robot';

    const signupRes = await request(app)
      .post('/users/signup')
      .send(userData);
    const { token } = signupRes.body;

    const postRoomRes = await request(app)
      .post('/api/v1/rooms/')
      .set('Authorization', token)
      .send({ name: 'bobs room' });
    const roomId = postRoomRes.body?.room?.id;

    console.log('sent roomid', roomId);
    const postMessageRes = await request(app)
      .post(`/api/v1/rooms/${roomId}/messages/`)
      .set('Authorization', token)
      .send({ message: testMessageText });
    const message = postMessageRes.body?.message;

    const getMessagesRes = await request(app)
      .get(`/api/v1/rooms/${roomId}/messages/`)
      .set('Authorization', token);
    const messages = getMessagesRes.body?.messages;

    console.log('getMessagesRes.body', getMessagesRes.body);
    
    expect(message.message).toEqual(testMessageText);
    expect(messages).toContainEqual(message);
  });
});
