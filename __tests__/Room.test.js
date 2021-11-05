const setup = require('../data/setup.js');
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

  it('can create a room, add a user, and get the rooms for that user', async () => {
    const bob = await User.insertUser('bob', 'bobhash');
    const bobsRoom = await Room.insertRoom('bobs room');
    Room.addUserToRoom(bobsRoom.id, bob.id);
    const roomsForBob = await Room.getUsersRooms(bob.id);

    expect(roomsForBob).toContainEqual(bobsRoom);
  });

});
