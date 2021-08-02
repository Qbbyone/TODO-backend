const convertToDto = (note) => {
  return {
    id: note.note_id,
    title: note.title,
    description: note.description,
    isPinned: note.is_pinned,
    tagsArray: []
  };
};

module.exports = convertToDto;
