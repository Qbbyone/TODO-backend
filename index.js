const express = require("express");
const config = require("config")
const cors = require('cors');
const tagsRouter = require("./routes/tags.routes");
const notesRouter = require("./routes/notes.routes")
const db = require("./database");

const app = express();

app.use(cors())

const PORT = config.get("port") || 5000;

app.use(express.json({ extended: true }));

app.use('/api', tagsRouter)
app.use('/api', notesRouter)


async function startApp() {
  try {
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server error", e.message);
  }
}

startApp() 