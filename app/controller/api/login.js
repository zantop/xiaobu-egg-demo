'use strict';

/**
 * 登录注册相关
 */

const Controller = require('../../core/base_controller');

class LoginController extends Controller {
	async index() {
		const { ctx } = this;
		const { user } = ctx.service;
		const rule = {
			mobile: 'required|phone',
			password: {
				password: {
					min: 6,
					max: 18,
				},
			},
		};
		// 校验 `ctx.request.body` 是否符合我们预期的格式
		const messages = {
			'mobile.required': '必须填写手机号',
			'mobile.phone': '请输入一个正确的手机号',
			'password.required': '请填写密码',
			'password.password': '密码不正确',
		};
		const validator = await this.validator(ctx.request.body, rule, messages);
		if (validator) {
			const { mobile, password } = ctx.request.body;
			const res = await user.login(mobile, password);
			if (res.state) {
				const token = ctx.helper.createToken({ id: res.data.id });
				this.successToken(res.data, token, '登陆成功');
			} else {
				this.error(null, '用户名或密码错误');
			}
		}
	}

	async register() {
		const { ctx } = this;
		const { user } = ctx.service;
		const rule = {
			mobile: 'required|phone',
			password: {
				password: {
					min: 6,
					max: 18,
				},
			},
		};
		// 校验 `ctx.request.body` 是否符合我们预期的格式
		const messages = {
			'mobile.required': '必须填写手机号',
			'mobile.phone': '请输入一个正确的手机号',
			'password.password': '密码太简单了',
		};
		const validator = await this.validator(ctx.request.body, rule, messages);
		// 调用 service 创建User
		if (validator) {
			const { mobile, password } = ctx.request.body;
			const res = await user.create(mobile, password);
			res.state ? this.success(res.data, res.message) : this.error(null, res.message);
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
