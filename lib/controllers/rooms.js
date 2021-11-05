const { Router } = require('express');
const Room = require('../models/Room.js');

module.exports = Router()
  .get('/', async (req, res) => {
    const userId = req.userId;
    const rooms = await Room.getUsersRooms(userId);
    res.json({ rooms });
  })
  .post('/', async (req, res) => {
    const { userId } = req;
    const { name } = req.body;
    const newRoom = await Room.insertRoom(name);
    await Room.addUserToRoom(newRoom.id, userId);
    res.json({ room: newRoom });
  });
