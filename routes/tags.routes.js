const Router = require("express");
const TagsController = require("../controllers/TagsController.js");

const tagsRouter = new Router();

tagsRouter.post('/addTag', TagsController.addTag)

module.exports = tagsRouter;