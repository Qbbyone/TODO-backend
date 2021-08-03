const models = require("../database");

class TagsService {
  async addTag(tagName, tagIsActive, userId) {
    return await models.Tag.create({
      name: tagName,
      is_active: tagIsActive,
      user_id: userId,
    });
  }

  async getTagById(tagId) {
    const tag = await models.Tag.findByPk(tagId)
    return tag.user_id
  }

  async getTagsByUserId(userId) {
    return await models.Tag.findAll({ where: { user_id: userId }, raw: true });
  }

  async deleteTag(tagId) {
    return await models.Tag.destroy({ where: { tag_id: tagId } })
  }
}

module.exports = new TagsService();
