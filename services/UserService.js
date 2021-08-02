const models = require("../database");

class UserService {
  async getUserIdByToken(token) {
    return await models.User.findOne({ where: { token: token }, raw: true }).then(user => user.user_id);
  }
}

module.exports = new UserService();
