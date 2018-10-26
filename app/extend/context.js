'use strict';
/**
 * 生成 Token
 * @param {Object} data
 * @return {String}
 * createToken
 */
module.exports = {
  createToken(data) {
    const { app } = this;
    // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
    return app.jwt.sign(data, app.config.jwt.secret, {
      expiresIn: '12h',
    });
  },
  // 获取 Token
  getToken() {
    const Token = this.request.header.authorization;
    return Token;
  },
  /**
   * 验证token的合法性
   * @param {String} token - token
   * @return {Object} - 返回验证结果
   */
  // 校验 Token
  async verifyToken(userId) {
    const { app } = this;
    const token = this.getToken();
    try {
      const result = await app.jwt.verify(token, app.config.jwt.secret);
      if (userId !== result.id) {
        return {
          state: false,
          message: 'Token和用户不符',
        };
      }
      return {
        state: true,
        message: 'Token验证成功',
      };
    } catch (error) {
      return {
        state: false,
        message: 'Token校验失败',
      };
    }
  },
};

