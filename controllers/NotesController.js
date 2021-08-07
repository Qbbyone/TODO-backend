const userService = require("../services/UserService");
const noteService = require("../services/NotesService")
const getData = require("../data");

class NotesController {
  async loadNoteList(req, res) {
    try {
      const userId = await userService.getUserIdByToken(req.query.token);
      const [tagList, noteList] = await getData(userId);
      res.json(noteList);
    } catch (e) {
      console.log("NOTELIST ERROR", e);
      res.status(500).json(e);
    }
  }

  async addNote(req, res) {
    try {
      const { title, description, userToken, isPinned, activeTagsArray } = req.body;
      const userId = await userService.getUserIdByToken(userToken);
      
      await noteService.addNote(title, description, isPinned, activeTagsArray, userId);

      const [tagList, noteList] = await getData(userId)

      if (!tagList || !noteList) {
        throw new Error("Server Error");
      }
      res.json({ tagList, noteList });
    } catch (e) {
      console.log("ADD NOTELIST ERROR", e);
      res.status(500).json(e);
    }
  }

  async deleteNote(req, res) {
    try {
      const noteId = req.query.id
      const note = await noteService.getNoteById(noteId)
      const userId = note.user_id;
      await noteService.deleteNote(userId)
      const [tagList, noteList] = await getData(userId)
      res.json({ tagList, noteList });
    } catch (e) {
      console.log("DELETE NOTELIST ERROR", e);
      res.status(500).json(e);
    }
  }
}

module.exports = new NotesController();
