const userService = require("../services/UserService");
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
}

module.exports = new NotesController();
