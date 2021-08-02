const express = require("express");
const config = require("config")
const cors = require('cors');
const tagsRouter = require("./routes/tags.routes");
const db = require("./database");

// const noteRouter = require("./routes/notes.routes")

const app = express();

app.use(cors())

const PORT = config.get("port") || 5000;

app.use(express.json({ extended: true }));

app.use('/api', tagsRouter)
// app.use('/api/notes', require("./routes/notes.routes"))


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