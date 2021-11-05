const pool = require('../utils/pool.js');

module.exports = class Message {
  message;
  senderId;

  constructor(row) {
    this.message = row.message;
    this.senderId = row.senderId;
  }

  static async getRoomMessages(roomId) {
    const { rows } = await pool.query(`
      SELECT a.message AS "message", b.id AS "senderId", a.room_id AS "room_id"
      FROM messages a
      INNER JOIN users b
      ON a.user_id = b.id
      WHERE room_id = $1;
    `, [roomId]);

    return rows.map(row => new Message(row));
  }

  static async insertMessage(roomId, senderId, message) {
    const { rows } = await pool.query(`
      INSERT INTO messages (room_id, user_id, message)
      VALUES ($1, $2, $3)
      RETURNING message, user_id AS "senderId";
    `, [roomId, senderId, message]);

    return rows[0] ? new Message(rows[0]) : undefined;
  }

};
