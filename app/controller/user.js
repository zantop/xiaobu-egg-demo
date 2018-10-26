'use strict';

// 继承自base_controller
const Controller = require('../core/base_controller');

class UserController extends Controller {
  /**
   * @api {get} /api/user 获取用户信息
   * @apiDescription 根据id查询用户信息
   * @apiGroup  user
   * @apiParam {String} id
   * @apiSuccess {Number} code 200
   * @apiSuccess {String} state success
   * @apiSuccess {Object} data {userInfo}
   *
   */
  async index() {
    const { ctx } = this;
    const { user } = ctx.service;
    const id = ctx.query.id;
    // 定义创建接口的请求参数规则
    const rule = {
      id: 'required',
    };
    const messages = {
      'id.required': '没有id',
    };
    const validator = await this.validator(ctx.query, rule, messages);
    if (validator) {
      const res = await user.getUser(id);
      res ? this.success(res.data, '获取成功') : this.error(null, '获取失败');
    }
  }

  /**
   * @api {post} /api/user 用户注册
   * @apiDescription 用户注册
   * @apiGroup  user
   * @apiParam {String} username
   * @apiParam {String} password
   * @apiSuccess {Number} code 200
   * @apiSuccess {String} state success
   * @apiSuccess {Object} data {userInfo}
   *
   */
  async create() {
    const { ctx } = this;
    const { user } = ctx.service;
    const rule = {
      username: 'required|phone',
      password: {
        password: {
          min: 6,
          max: 18,
        },
      },
    };
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    const messages = {
      'username.required': '必须填写手机号',
      'username.phone': '请输入一个正确的手机号',
      'password.password': '密码太简单了',
    };
    const validator = await this.validator(ctx.request.body, rule, messages);
    // 调用 service 创建User
    if (validator) {
      const { username, password } = ctx.request.body;
      const res = await user.create(username, password);
      res.state ? this.success(res.data, res.message) : this.error(null, res.message);
    }
  }

  /**
   * @api {put} /api/user/:id 更改用户信息
   * @apiDescription 根据id修改用户信息
   * @apiGroup  user
   * @apiParam {String} id
   * @apiParam {String} username
   * @apiParam {String} password
   * @apiSuccess {Number} code 200
   * @apiSuccess {String} state success
   * @apiSuccess {Object} data {userInfo}
   *
   */
  async update() {
    const { ctx } = this;
    const { user } = ctx.service;
    const rule = {
      id: 'required',
      username: 'required|phone',
      password: {
        password: {
          min: 6,
          max: 18,
        },
      },
    };
    const messages = {
      'id.required': '没有id',
      'username.phone': '请输入一个正确的手机号',
      'password.password': '密码太简单了',
    };
    const validator = await this.validator(ctx.request.body, rule, messages);
    if (validator) {
      const { username, password, id } = this.ctx.request.body;
      const res = await user.update(username, password, id);
      res.state ? this.success(res.data, res.message) : this.error(null, res.message);
    }
  }

  /**
   * @api {delete} /api/user/:id 删除用户
   * @apiDescription 根据id删除用户
   * @apiGroup  user
   * @apiParam {String} id
   * @apiSuccess {Number} code 200
   * @apiSuccess {String} state success
   *
   */
  async destroy() {
    const { ctx } = this;
    const { user } = ctx.service;
    const id = ctx.request.body.id;
    const rule = {
      id: 'required',
    };
    const messages = {
      'id.required': '没有id',
    };
    const validator = await this.validator(ctx.request.body, rule, messages);
    if (validator) {
      const res = await user.delete(id);
      res.state ? this.success(res.data, res.message) : this.error(null, res.message);
    }
  }

  /**
   * @api {get} /api/user/:id 分页获取用户列表
   * @apiDescription 分页获取用户列表
   * @apiGroup  user
   * @apiParam {Number} page
   * @apiParam {Number} pageSize
   * @apiSuccess {Number} code 200
   * @apiSuccess {String} state success
   *
   */
  async show() {
    const { ctx } = this;
    const { user } = ctx.service;
    const { page, pageSize } = ctx.query;
    // 定义创建接口的请求参数规则
    const rule = {
      page: 'required',
      pageSize: 'required',
    };
    const messages = {
      'page.required': '请传page',
      'pageSize.required': '请传pageSize',
    };
    const validator = await this.validator(ctx.query, rule, messages);
    if (validator) {
      const res = await user.getUserByPage(page, pageSize);
      res.state ? this.success(res.data, res.message) : this.error(null, res.message);
    }
  }
}
module.exports = UserController;
