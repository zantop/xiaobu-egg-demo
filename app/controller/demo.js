'use strict';

const Controller = require('egg').Controller;

class DemoController extends Controller {
  async login() {
    const ctx = this.ctx;
    await ctx.render('login/login.tpl');
  }
  async register() {
    const ctx = this.ctx;
    await ctx.render('login/register.tpl');
  }
  async update() {
    const ctx = this.ctx;
    await ctx.render('login/update.tpl');
  }
  async delete() {
    const ctx = this.ctx;
    await ctx.render('login/delete.tpl');
  }
}

module.exports = DemoController;
