const { Router } = require('express');
const Message = require('../models/Message.js');
const MessageService = require('../services/MessageService.js');

module.exports = Router()
  .get('/:roomId/messages/', async (req, res) => {
    const messages = await Message.getRoomMessages(req.params.roomId);
    res.json({ messages });
  })
  .post('/:roomId/messages/', async (req, res) => {
    const { roomId } = req.params;
    const { userId } = req;
    const { message } = req.body;

    const result = await MessageService.createMessage(roomId, userId, message);
    res.status(result.status).json(result.response);
  });
