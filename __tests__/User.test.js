const setup = require('../data/setup.js');
const pool = require('../lib/utils/pool.js');
const User = require('../lib/models/User.js');

describe('User model tests', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });

  it('can insert a new user and get the user from the db', async () => {
    const username = 'bob';
    const insertedUser = await User.insertUser(username, 'fakehash');
    const gottenUser = await User.getByUsername(username);

    expect(gottenUser).toEqual(insertedUser);
  });

});
