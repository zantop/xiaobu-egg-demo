'use strict';

const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const rule = {
  username: 'string',
  password: { type: 'password', required: false },
  id: { type: 'int', required: false },
};

class TopicController extends Controller {
  async create() {
    const ctx = this.ctx;
    console.log(ctx.request.body);
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(rule, ctx.request.body);
    // 调用 service 创建User
    const id = await ctx.service.restful.create(ctx.request.body);
    // 设置响应体和状态码
    ctx.body = {
      user_id: id,
    };
    ctx.status = 201;
  }
}
module.exports = TopicController;
