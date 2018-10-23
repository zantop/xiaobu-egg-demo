'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async getUserById() {
    const id = this.ctx.query.id;
    const res = await this.ctx.service.user.userInfo(id);
    this.ctx.body = res;
  }
  async login() {
    const { username, password } = this.ctx.request.body;
    const res = await this.ctx.service.user.login(username, password);
    this.ctx.body = res;
  }
  async register() {
    const { username, password } = this.ctx.request.body;
    const res = await this.ctx.service.user.register(username, password);
    this.ctx.body = res;
  }
  async update() {
    const { username, password, id } = this.ctx.request.body;
    const res = await this.ctx.service.user.update(username, password, id);
    this.ctx.body = res;
  }
  async delete() {
    const { id } = this.ctx.request.body;
    const res = await this.ctx.service.user.delete(id);
    this.ctx.body = res;
  }
}

module.exports = UserController;
