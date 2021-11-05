const setup = require('../data/setup.js');
const Message = require('../lib/models/Message.js');
const Room = require('../lib/models/Room.js');
const User = require('../lib/models/User.js');
const pool = require('../lib/utils/pool.js');

describe('User model tests', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });

  test('getRoomMessages and insertMessage works', async () => {
    const messageText = 'I am bob, hear me roar';
    const bob = await User.insertUser('bob', 'bobhash');
    const bobsRoom = await Room.insertRoom('bobs room');
    const message = await Message.insertMessage(bobsRoom.id, bob.id, messageText);
    const gottenMessages = await Message.getRoomMessages(bobsRoom.id);

    expect(message.message).toEqual(messageText);
    expect(gottenMessages).toContainEqual(message);
  });

});
