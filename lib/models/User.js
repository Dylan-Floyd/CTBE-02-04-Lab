const pool = require('../utils/pool.js');

module.exports = class User {
  id;
  username;
  hash;

  constructor(row) {
    this.id = row?.id;
    this.username = row?.username;
    this.hash = row?.hash;
  }

  static async getByUsername(username) {
    const { rows } = await pool.query(`
    SELECT * FROM users
    WHERE username=$1;
    `, [username]);
    return rows[0] ? new User(rows[0]) : undefined;
  }

  static async insertUser(username, hash) {
    const { rows } = await pool.query(`
    INSERT INTO users (username, hash)
    VALUES ($1, $2)
    RETURNING *;
    `, [username, hash]);
    return rows[0] ? new User(rows[0]) : undefined;
  }

};
