'use strict';

/**
 * 生成 Token
 * @param {Object} data - 用户id对象
 * @return {String} - 返回token
 */
exports.createToken = data => {
  const { app } = this;
  return app.jwt.sign(data, app.config.jwt.secret, {
    expiresIn: '12h',
  });
};

// 获取 Token
exports.getAccessToken = ctx => {
  const Token = ctx.request.header.authorization;
  return Token;
};

// 校验 Token
exports.verifyToken = async (ctx, userId) => {
  const token = this.getAccessToken(ctx);
  const verifyResult = await ctx.service.token.verifyToken(token);
  if (!verifyResult) {
    return {
      state: false,
      message: 'Token校验失败',
    };
  }
  if (userId !== verifyResult.id) {
    return {
      state: false,
      message: 'Token和用户不符',
    };
  }
  return {
    state: true,
    message: 'Token验证成功',
  };
};
