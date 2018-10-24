'use strict';

const { Service } = require('egg');

class TokenServer extends Service {
  /**
 * 生成 Token
 * @param {Object} data - 用户id对象
 * @return {String} - 返回token
 */
  create(data) {
    return this.app.jwt.sign(data, this.config.jwt.secret, {
      expiresIn: '12h',
    });
  }

  /**
   * 验证token的合法性
   * @param {String} token - token
   * @return {Object} - 返回验证结果
   */
  async verifyToken(token) {
    const { app } = this;
    try {
      const result = await app.jwt.verify(token, app.config.jwt.secret);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = TokenServer;
