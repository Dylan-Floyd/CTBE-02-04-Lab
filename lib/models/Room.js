const pool = require('../utils/pool.js');

module.exports = class Room {
  name;
  id;

  constructor(row) {
    this.name = row.name;
    this.id = row.id;
  }

  static async getUsersRooms(userId) {
    const { rows } = await pool.query(`
      SELECT a.room_id AS "id", b.name AS "name"
      FROM user_rooms a
      INNER JOIN rooms b
      ON a.room_id = b.id
      WHERE a.user_id = $1;
    `, [userId]);

    return rows.map(row => new Room(row));
  }

  static async insertRoom(name) {
    const { rows } = await pool.query(`
      INSERT INTO rooms (name)
      VALUES ($1)
      RETURNING *;
    `, [name]);

    return rows[0] ? new Room(rows[0]) : undefined;
  }

  static async addUserToRoom(roomId, userId) {
    /* const { rows }  = */await pool.query(`
      INSERT INTO user_rooms (room_id, user_id)
      VALUES ($1, $2);
    `, [roomId, userId]);

    //TODO: figure out what to return
    
  }
};
