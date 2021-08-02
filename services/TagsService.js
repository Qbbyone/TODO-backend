const models = require("../database");

class TagsService {
  async addTag(tagName, tagIsActive, userId) {
    models.Tag.create({
      name: tagName,
      is_active: tagIsActive,
      user_id: userId,
    })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => console.log(err));
  }

  async getTagsByUserId(userId) {
    return await models.Tag.findAll({ where: { user_id: userId }, raw: true });
  }
}

module.exports = new TagsService();
