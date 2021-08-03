const Router = require("express");
const TagsController = require("../controllers/TagsController.js");

const tagsRouter = new Router();

tagsRouter.get("/loadTagList", TagsController.loadTagList)

tagsRouter.post('/addTag', TagsController.addTag)

tagsRouter.get('/deleteTag', TagsController.deleteTag)

module.exports = tagsRouter;