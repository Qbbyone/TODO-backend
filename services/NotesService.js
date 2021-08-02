const models = require("../database");

class NoteService {
  async getNotesByUserId(userId) {
    return await models.Note.findAll({ where: { user_id: userId }, raw: true })
  }
}

module.exports = new NoteService();