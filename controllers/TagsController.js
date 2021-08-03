const tagService = require("../services/TagsService");
const noteService = require("../services/NotesService");
const userService = require("../services/UserService");
const tagDto = require("../dto/tag.dto");
const noteDto = require("../dto/note.dto");

class TagsController {
  async loadTagList(req, res) {
    try {
      const userId = await userService.getUserIdByToken(req.query.token);
      const tagList = await tagService
        .getTagsByUserId(userId)
        .then((tagList) => tagList.map((tag) => tagDto(tag)));
      res.json( tagList );
    } catch (e) {
      console.log("TAGLIST ERROR");
      res.status(500).json(e);
    }
  }

  async addTag(req, res) {
    try {
      const { name, isActive, userToken } = req.body;
      const userId = await userService.getUserIdByToken(userToken);
      await tagService.addTag(name, isActive, userId);

      // get tags
      const tagList = await tagService
        .getTagsByUserId(userId)
        .then((tagList) => tagList.map((tag) => tagDto(tag)));

      // get notes
      const noteList = await noteService
        .getNotesByUserId(userId)
        .then((noteList) => noteList.map((note) => noteDto(note)));

      if (!tagList || !noteList) {
        throw new Error("Server Error");
      }
      res.json({ tagList, noteList });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async deleteTag(req, res) {
    try {
      const tagId = req.query.id
     
      const userId = await tagService.getTagById(tagId)

      await tagService.deleteTag(tagId)

      // get tags
      const tagList = await tagService
        .getTagsByUserId(userId)
        .then((tagList) => tagList.map((tag) => tagDto(tag)));

      // get notes
      const noteList = await noteService
        .getNotesByUserId(userId)
        .then((noteList) => noteList.map((note) => noteDto(note)));

      res.json({ tagList, noteList });
    } catch (e) {
      console.log("TAG DELETE ERROR", e);
      res.status(500).json(e);
    }
  }  
}

module.exports = new TagsController();
