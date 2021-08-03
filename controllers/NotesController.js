const noteService = require("../services/NotesService");
const userService = require("../services/UserService");
const tagDto = require("../dto/tag.dto");
const noteDto = require("../dto/note.dto");

class NotesController {
  async loadNoteList(req, res) {
    try {
      const userId = await userService.getUserIdByToken(req.query.token);
      const noteList = await noteService
        .getNotesByUserId(userId)
        .then((noteList) => noteList.map((note) => noteDto(note)));
      res.json(noteList);
    } catch (e) {
      console.log("NOTELIST ERROR");
      res.status(500).json(e);
    }
  }
}

module.exports = new NotesController();
