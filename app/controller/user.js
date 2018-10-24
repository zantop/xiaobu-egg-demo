'use strict';

// 继承自base_controller
const Controller = require('../core/base_controller');

class UserController extends Controller {
  // 查
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

  // 增
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

  // 改
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

  // 删
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
  // 分页
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
