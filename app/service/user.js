'use strict';

const Service = require('../core/base_service');

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
   * 登陆
   * @param {String} username - 用户名
   * @param {String} password - 密码
   * @return {Object} - 结果
   */
  async login(username, password) {
    const user = await this.ctx.model.User.findOne({
      where: {
        username,
        password,
      },
    });
    if (user) {
      return this.success(user, '登陆成功');
    }
    return this.error('用户名或密码错误');
  }
  /**
   * 注册
   * @param {String} username - 用户名
   * @param {String} password - 密码
   * @return {Object} - 返回用户信息
   */
  async create(username, password) {
    const isExist = await this.isExist(username);
    if (isExist) {
      return this.error('该手机号已被注册');
    }
    const user = await this.ctx.model.User.create({
      username,
      password,
    });
    return this.success(user, '注册成功');
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
    return this.success(user, '删除成功');
  }
  /**
   * 修改账号密码
   * @param {String} username - 用户名
   * @param {String} password - 密码
   * @param {Number} id - 用户id
   * @return {Object} - 返回用户信息
   */
  async update(username, password, id) {
    const isExist = await this.isExist(username);
    if (isExist) {
      return this.error('该手机号已存在');
    }
    const user = await this.ctx.model.User.update({
      username,
      password,
    }, {
      where: {
        id,
      },
    });
    console.log(user);
    return this.success(user, '修改成功');
  }
  /**
   * 分页查询
   * @param {Number} page - 页
   * @param {Number} pageSize - 每页容量
   * @return {Object} - 返回用户列表
   */
  async getUserByPage(page, pageSize) {
    const users = await this.ctx.model.User.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      where: {},
    });
    if (users.rows.length > 0) {
      return this.success(users, '查询成功');
    }
    return this.error('没有找到用户');
  }
}

module.exports = RestfulService;
