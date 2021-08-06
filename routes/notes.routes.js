const Router = require("express");
const NotesController = require("../controllers/NotesController");

const notesRouter = new Router();

notesRouter.get("/loadNoteList", NotesController.loadNoteList)

notesRouter.post("/addNote", NotesController.addNote)

module.exports = notesRouter;