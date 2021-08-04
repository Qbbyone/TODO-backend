function convertToDto(note, tagList) {
  const tagsArray = checkTagStatus(tagList, note.note_tags);
  console.log("3", tagsArray);
  return {
    id: note.note_id,
    title: note.title,
    description: note.description,
    isPinned: note.is_pinned,
    tagsArray: tagsArray,
  };
}

function checkTagStatus(tagList, activeTagsArray) {
  console.log("1", tagList);
  for (let i in tagList) {
    for (let j in activeTagsArray) {
      if (tagList[i].id === activeTagsArray[j]) {
        tagList[i].isActive = true
      } else {
        tagList[i].isActive = false
      }
    }
  }
  console.log("2", tagList);
  return tagList;
  
}

module.exports = convertToDto;
