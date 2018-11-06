'use strict';

const Controller = require('egg').Controller;

class SsrController extends Controller {
  async index() {
    return this.ctx.render({
      screen: 'Home',
    });
  }
  async error400() {
    return this.ctx.render({
      screen: 'errors/400',
    });
  }
  async error500() {
    return this.ctx.render({
      screen: 'errors/500',
    });
  }
}

module.exports = SsrController;
