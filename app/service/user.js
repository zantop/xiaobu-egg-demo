'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 获取用户信息
   * @param {Number} user_id - 用户id
   * @return {Object} - 返回用户信息
   */
  async userInfo(user_id) {
    const user = await this.ctx.model.User.findOne({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      this.ctx.throw(404, '用户不存在');
    }
    console.log(user);
    return user;
  }
  /**
   * 登录
   * @param {String} username - 用户名
   * @param {String} password - 密码
   * @return {Object} - 返回用户信息
   */
  async login(username, password) {
    const user = await this.ctx.model.User.findAll({
      where: {
        username,
        password,
      },
    });
    if (!user) {
      this.ctx.throw(404, '用户名或密码错误');
    }
    return user;
  }
  /**
   * 注册
   * @param {String} username - 用户名
   * @param {String} password - 密码
   * @return {Object} - 返回用户信息
   */
  async register(username, password) {
    const user = await this.ctx.model.User.create({
      username,
      password,
    });
    return user;
  }
  /**
   * 修改账号密码
   * @param {String} username - 用户名
   * @param {String} password - 密码
   * @param {Number} id - 用户id
   * @return {Object} - 返回用户信息
   */
  async update(username, password, id) {
    const user = await this.ctx.model.User.update({
      username,
      password,
    }, {
      where: {
        id,
      },
    });
    console.log(user);
    return user;
  }

  /**
   * 删除用户
   * @param {Number} id - 用户id
   * @return {Object} - 返回用户信息
   */
  async delete(id) {
    const user = await this.ctx.model.User.destroy({
      where: {
        id,
      },
    });
    console.log(user);
    return user;
  }
}

module.exports = UserService;
