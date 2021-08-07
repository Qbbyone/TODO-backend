const models = require("../database");

class NoteService {
  async getNotesByUserId(userId) {
    return await models.Note.findAll({ where: { user_id: userId }, raw: true });
  }

  async getNoteById(noteId) {
    return await models.Note.findByPk(noteId);
  }

  async addNote(title, description, isPinned, activeTagsArray, userId) {
    return await models.Note.create({
      title: title,
      description: description,
      is_pinned: isPinned,
      note_tags: activeTagsArray,
      user_id: userId,
    });
  }

  async deleteNote(noteId) {
    return await models.Note.destroy({ where: { note_id: noteId } });
  }
}

module.exports = new NoteService();
