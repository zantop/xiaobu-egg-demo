'use strict';

const Service = require('egg').Service;

class RestfulService extends Service {

  async create(params) {
    const result = await this.ctx.model.User.create(params);
    // 检查调用是否成功，如果调用失败会抛出异常
    this.checkSuccess(result);
    // 返回创建的 topic 的 id
    return result.id;
  }

  // 封装统一的调用检查函数，可以在查询、创建和更新等 Service 中复用
  checkSuccess(result) {
    if (!result) {
      this.ctx.throw(result.status, 'sql错误');
    }
  }
}

module.exports = RestfulService;
