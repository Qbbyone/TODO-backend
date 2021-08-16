const models = require("../database");

class NoteService {
  async getNotesByUserId(userId, searchQuery) {
    let searchQueryValue = searchQuery.toLowerCase();
    const { Op } = require("sequelize");

    return await models.Note.findAll({
      where: {
        user_id: userId,
        [Op.or]: [
          { is_pinned: true },
          {
            title: {
              [Op.like]: "%" + searchQueryValue + "%",
            },
          },
          {
            description: {
              [Op.like]: "%" + searchQueryValue + "%",
            },
          },
        ],
      },
      raw: true,
      order: [["note_id", "ASC"]],
    });
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

  async editNote(title, description, isPinned, activeTagsArray, noteId) {
    return await models.Note.update(
      {
        title: title,
        description: description,
        is_pinned: isPinned,
        note_tags: activeTagsArray,
      },
      { where: { note_id: noteId } }
    );
  }

  async pinNote(noteId, noteStatus) {
    return await models.Note.update(
      { is_pinned: noteStatus },
      { where: { note_id: noteId } }
    );
  }

  async deleteNote(noteId) {
    return await models.Note.destroy({ where: { note_id: noteId } });
  }
}

module.exports = new NoteService();
