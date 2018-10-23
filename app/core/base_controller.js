'use strict';

// app/core/base_controller.js
const { Controller } = require('egg');
class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }
  // 请求成功
  success(data, msg) {
    const message = msg || null;
    this.ctx.body = {
      state: 'success',
      code: 200,
      message,
      data,
    };
  }
  // 请求失败
  error(data, msg) {
    const message = msg || null;
    this.ctx.body = {
      state: 'error',
      code: 201,
      message,
      data,
    };
  }
  // 参数错误
  async validator(query, rule, messages) {
    const { app } = this;
    const errors = await app.validator.validate(query, rule, messages);
    if (errors) {
      this.error(errors, errors[0].message);
      return;
    }
    return true;
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;
