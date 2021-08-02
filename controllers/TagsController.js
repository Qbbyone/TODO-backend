const tagService = require("../services/TagsService");
const noteService = require("../services/NotesService");
const userService = require("../services/UserService");
const tagDto = require("../dto/tag.dto");
const noteDto = require("../dto/note.dto");

class TagsController {
  async addTag(req, res) {
    try {
      const { name, isActive, userToken } = req.body;
      const userId = await userService.getUserIdByToken(userToken);
      await tagService.addTag(name, isActive, userId);
      const tagList = await tagService
        .getTagsByUserId(userId)
        .then((tagList) => tagList.map((tag) => tagDto(tag)));

      const noteList = await noteService
        .getNotesByUserId(userId)
        .then((noteList) => noteList.map((note) => noteDto(note)));
        console.log(noteList);
      if (!tagList || !noteList) {
        throw new Error("Server Error");
      }
      res.json({ tagList, noteList });
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = new TagsController();
