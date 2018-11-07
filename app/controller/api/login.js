'use strict';

// Token 示例

const Controller = require('../../core/base_controller');

class LoginController extends Controller {
	async index() {
		const { ctx } = this;
		const { user } = ctx.service;
		const rule = {
			username: 'required|phone',
			password: {
				password: {
					min: 6,
					max: 18,
				},
			},
		};
		// 校验 `ctx.request.body` 是否符合我们预期的格式
		const messages = {
			'username.required': '必须填写手机号',
			'username.phone': '请输入一个正确的手机号',
			'password.required': '请填写密码',
			'password.password': '密码不正确',
		};
		const validator = await this.validator(ctx.request.body, rule, messages);
		if (validator) {
			const { username, password } = ctx.request.body;
			const res = await user.login(username, password);
			if (res.state) {
				const token = ctx.createToken({ id: res.data.id });
				this.successToken(res.data, token, '登陆成功');
			} else {
				this.error(null, '用户名或密码错误');
			}
		}
	}
	async getUser() {
		const { ctx } = this;
		const { user } = ctx.service;
		const id = ctx.request.body.id;
		// 定义创建接口的请求参数规则
		const rule = {
			id: 'required',
		};
		const messages = {
			'id.required': '没有id',
		};
		const validator = await this.validator(ctx.request.body, rule, messages);
		if (validator) {
			const isVerify = await ctx.verifyToken(id);
			if (isVerify.state) {
				const res = await user.getUser(id);
				res ? this.success(res.data, '获取成功') : this.error(null, '获取失败');
			} else {
				this.error(null, isVerify.message);
			}
		}
	}
}
module.exports = LoginController;
