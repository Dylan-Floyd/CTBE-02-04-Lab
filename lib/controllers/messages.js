const { Router } = require('express');
const Message = require('../models/Message.js');

module.exports = Router()
  .get('/:roomId/messages/', async (req, res) => {
    const messages = await Message.getRoomMessages(req.params.roomId);
    res.json({ messages });
  })
  .post('/:roomId/messages/', async (req, res) => {
    const { roomId } = req.params;
    const { userId } = req;
    const { message } = req.body;
    const result = await Message.insertMessage(roomId, userId, message);
    if(result) {
      res.json({ message: result });
    } else {
      res.status(500).json({ error: 'Could not store message' });
    }
  });
