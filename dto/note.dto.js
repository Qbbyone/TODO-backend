function convertToDto(note, tagList) {
  const tagsArray = checkTagStatus(tagList, note.note_tags);
 
  return {  
    id: note.note_id,
    title: note.title,
    description: note.description,
    isPinned: note.is_pinned,
    tagsArray: tagsArray,
  };
}

function checkTagStatus(tagList, activeTagsArray) {
  for (let i in tagList) {
    if(activeTagsArray.includes(tagList[i].id)) {
        tagList[i].isActive = true
      } else {
        tagList[i].isActive = false
      } 
    }
  
  return tagList;
}

module.exports = convertToDto;
