'use strict';

const { Service } = require('egg');
class BaseService extends Service {
  /**
   * 成功信息封装
   * @param {String} data - 数据
   * @param {String} msg - message信息
   * @return {Object} - 返回状态信息 1成功，0失败
   */
  success(data, msg) {
    const message = msg || null;
    return {
      data,
      state: 1,
      message,
    };
  }
  /**
   * 失败信息封装
   * @param {String} msg - message信息
   * @return {Object} - 返回状态信息 1成功，0失败
   */
  error(msg) {
    const message = msg || null;
    return {
      state: 0,
      message,
    };
  }
}
module.exports = BaseService;
