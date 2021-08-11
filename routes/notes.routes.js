const Router = require("express");
const NotesController = require("../controllers/NotesController");

const notesRouter = new Router();

notesRouter.get("/loadNoteList", NotesController.loadNoteList)

notesRouter.post("/addNote", NotesController.addNote)

notesRouter.post("/editNote", NotesController.editNote)

notesRouter.get("/pinNote", NotesController.pinNote)

notesRouter.get("/deleteNote", NotesController.deleteNote)

module.exports = notesRouter; 