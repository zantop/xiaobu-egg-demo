'use strict';

const { Controller } = require('egg');
class BaseController extends Controller {
  /**
   * 请求成功
   * @param {Object} data - 返回数据
   * @param {String} msg - message信息
   */
  success(data, msg) {
    const message = msg || null;
    this.ctx.body = {
      state: 'success',
      code: 200,
      message,
      data,
    };
  }
  /**
   * 请求失败
   * @param {Object} data - 返回数据
   * @param {String} msg - message信息
   */
  error(data, msg) {
    const message = msg || null;
    this.ctx.body = {
      state: 'error',
      code: 201,
      message,
      data,
    };
  }
  /**
   * 参数校验
   * @param {Object} params - 传递过来参数对象
   * @param {Object} rule - 验证对象
   * @param {Object} messages - 验证信息对象
   * @return {Object} - ture表示验证成功,可以后续操作
   */
  async validator(params, rule, messages) {
    const { app } = this;
    const errors = await app.validator.validate(params, rule, messages);
    if (errors) {
      this.error(errors, errors[0].message);
      return;
    }
    return true;
  }

  // notFound(msg) {
  //   msg = msg || 'not found';
  //   this.ctx.throw(404, msg);
  // }
}
module.exports = BaseController;
