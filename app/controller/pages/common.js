'use strict';

const Controller = require('egg').Controller;

class SsrController extends Controller {
  async index() {
    return this.ctx.render({
      screen: 'Home',
    });
  }
  async notFound() {
    return this.ctx.render({
      screen: '404',
    });
  }
}

module.exports = SsrController;
