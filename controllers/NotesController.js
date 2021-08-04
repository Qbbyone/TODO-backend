const noteService = require("../services/NotesService");
const tagService = require("../services/TagsService")
const userService = require("../services/UserService");
const tagDto = require("../dto/tag.dto");
const noteDto = require("../dto/note.dto");

class NotesController {
  async loadNoteList(req, res) {
    try {
      const userId = await userService.getUserIdByToken(req.query.token);
      
      // get tagList
      const tagList = await tagService
        .getTagsByUserId(userId)
        .then((tagList) => tagList.map((tag) => tagDto(tag)));
      
      const noteList = await noteService
        .getNotesByUserId(userId)
        .then((noteList) => noteList.map((note) => noteDto(note, JSON.parse(JSON.stringify(tagList)))));
      res.json(noteList);
    } catch (e) {
      console.log("NOTELIST ERROR", e);
      res.status(500).json(e);
    }
  }
}

module.exports = new NotesController();
