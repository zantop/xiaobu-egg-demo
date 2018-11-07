'use strict'

const Controller = require('egg').Controller

class SsrController extends Controller {
	async login() {
		return this.ctx.render({
			screen: 'index',
		})
	}
	async register() {
		return this.ctx.render({
			screen: 'register',
		})
	}
	async main() {
		return this.ctx.render({
			screen: 'main',
		})
	}
	async notFound() {
		return this.ctx.render({
			screen: '404',
		})
	}
}

module.exports = SsrController
