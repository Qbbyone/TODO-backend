const tagService = require("./services/TagsService");
const noteService = require("./services/NotesService");
const tagDto = require("./dto/tag.dto");
const noteDto = require("./dto/note.dto");

async function getData(userId) {
  const activeTags = [];

  const tags = await tagService.getTagsByUserId(userId).then((tags) =>
    tags.map((tag) => {
      if (tag.is_active) activeTags.push(tag.tag_id);
      return tagDto(tag);
    })
  );
  
  const notes = await noteService
    .getNotesByUserId(userId)
    .then((notes) => 
      notes
        .sort(function(a,b){return a.is_pinned-b.is_pinned})
        .reverse() 
        .filter(
          (note) =>
            !activeTags.length ||
            note.note_tags.some((el) => activeTags.includes(el)) || note.is_pinned
        )
        .map((note) => noteDto(note, JSON.parse(JSON.stringify(tags))))
    );

  return [tags, notes];
}

module.exports = getData;
