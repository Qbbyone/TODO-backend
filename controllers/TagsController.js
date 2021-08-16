const tagService = require("../services/TagsService");
const userService = require("../services/UserService");
const tagDto = require("../dto/tag.dto");
const getData = require("../data");

class TagsController {
  async loadTagList(req, res) {
    try {
      const userId = await userService.getUserIdByToken(req.query.token);
      const tagList = await tagService
        .getTagsByUserId(userId)
        .then((tags) => tags.map((tag) => tagDto(tag)));
      res.json(tagList);
    } catch (e) {
      console.log("TAGLIST ERROR");
      res.status(500).json(e);
    }
  }

  async addTag(req, res) {
    try {
      const { name, isActive, userToken } = req.body;
      const searchQuery =  req.query.searchQuery
      const userId = await userService.getUserIdByToken(userToken);
      await tagService.addTag(name, isActive, userId);

      const [tagList, noteList] = await getData(userId, searchQuery)

      if (!tagList || !noteList) {
        throw new Error("Server Error");
      }
      res.json({ tagList, noteList });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async changeTagStatus(req, res) {
    try {
      const tagId = req.query.id;
      const searchQuery =  req.query.searchQuery
      const tag = await tagService.getTagById(tagId);
      const userId = tag.user_id;

      await tagService.changeTagStatus(tagId, !tag.is_active);

      const [tagList, noteList] = await getData(userId, searchQuery)

      res.json({ tagList, noteList });
    } catch (e) {
      console.log("CHANGE TAG STATUS ERROR", e);
      res.status(500).json(e);
    }
  }

  async deleteTag(req, res) {
    try {
      const tagId = req.query.id;
      const searchQuery =  req.query.searchQuery
      const tag = await tagService.getTagById(tagId);
      const userId = tag.user_id;
      await tagService.deleteTag(tagId);

      const [tagList, noteList] = await getData(userId, searchQuery)

      res.json({ tagList, noteList });
    } catch (e) {
      console.log("TAG DELETE ERROR", e);
      res.status(500).json(e);
    }
  }
}

module.exports = new TagsController();
