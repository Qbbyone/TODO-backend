const convertToDto = (tag) => {
  return { id: tag.tag_id, name: tag.name, isActive: tag.is_active };
};

module.exports = convertToDto;
