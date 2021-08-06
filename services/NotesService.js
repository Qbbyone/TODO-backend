const models = require("../database");

class NoteService {
  async getNotesByUserId(userId) {
    return await models.Note.findAll({ where: { user_id: userId }, raw: true })
  }

  async addNote(title, description, isPinned, activeTagsArray, userId) {
    return await models.Note.create({
      title: title,
      description: description,
      is_pinned: isPinned,
      note_tags: activeTagsArray,
      user_id: userId,
    })
  }
}

module.exports = new NoteService();