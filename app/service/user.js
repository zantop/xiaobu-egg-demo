'use strict';

const Service = require('egg').Service;

class RestfulService extends Service {

  /**
   * 判断用户名是否已存在
   * @description 存在返回用户信息，不存在返回false
   * @param {String} username - 用户名
   * @return {Object} - 返回用户信息 / false 没有注册
   */
  async isExist(username) {
    const user = await this.ctx.model.User.findOne({
      where: {
        username,
      },
    });
    if (user) {
      return user;
    }
    return false;
  }

  /**
   * 注册
   * @param {String} username - 用户名
   * @param {String} password - 密码
   * @return {Object} - 返回用户信息
   */
  async create(username, password) {
    const user = await this.ctx.model.User.create({
      username,
      password,
    });
    return user;
  }

  /**
   * 根据id获取用户信息
   * @param {Number} id - 用户id
   * @return {Object} - 返回用户信息
   */
  async getUser(id) {
    const user = await this.ctx.model.User.findOne({
      where: {
        id,
      },
    });
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
    return user;
  }
  // 封装统一的调用检查函数，可以在查询、创建和更新等 Service 中复用
  checkSuccess(result) {
    if (!result) {
      this.ctx.throw(result, 'sql错误');
    }
  }
}

module.exports = RestfulService;
