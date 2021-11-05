const Message = require('../models/Message.js');
const Toxicity = require('../utils/toxicity.js');

module.exports = class MessageService {
  static async createMessage(roomId, userId, message) {
    const result = {
      status: 200,
      response: {}
    };
    const isToxic = await Toxicity.isToxic(message);
    if(isToxic) {
      message = '~🤖 This message had a greater than 90% chance of being toxic so it has been filtered 🤖~';
    }
    const storedMessage = await Message.insertMessage(roomId, userId, message);
    if(storedMessage) {
      result.response = { message: storedMessage };
    } else {
      result.status = 500;
      result.response = { error: 'Could not store message' };
    }

    return result;
  }
};
