'use strict';

const Service = require('../core/base_service');
const md5 = require('md5');

class RestfulService extends Service {
	/**
   * 判断用户名是否已存在
   * @description 存在返回用户信息，不存在返回false
   * @param {String} mobile - 用户名
   * @return {Object} - 返回用户信息 / false 没有注册
   */
	async isExist(mobile) {
		const user = await this.ctx.model.User.findOne({
			where: {
				mobile,
			},
		});
		if (user) {
			return user;
		}
		return false;
	}
	/**
   * 登陆
   * @param {String} mobile - 手机号
   * @param {String} password - 密码
   * @return {Object} - 结果
   */
	async login(mobile, password) {
		const passwordMd5 = md5(password);
		const user = await this.ctx.model.User.findOne({
			where: {
				mobile,
			},
		});
		if (user) {
			const str1 = user.password.slice(0, 5);
			const str2 = user.password.slice(-5);
			const strMd5 = md5(passwordMd5 + str1 + str2);
			const passwordData = user.password.slice(5, -5);
			if (strMd5 === passwordData) {
				return this.success(user, '登陆成功');
			}
			return this.error('密码错误');

		}
		return this.error('不存在该用户');

	}
	/**
   * 注册
   * @param {String} mobile - 手机号
   * @param {String} password - 密码
   * @return {Object} - 返回用户信息
   */
	async create(mobile, password) {
		const isExist = await this.isExist(mobile);
		if (isExist) {
			return this.error('该手机号已被注册');
		}
		const randomStr = this.getRandStr2();
		const str10 = randomStr[0] + randomStr[1];
		const passwordMd5 = md5(password); // 第一次MD5
		const strMd5 = md5(passwordMd5 + str10); // MD5加10位随机串MD5
		const resultPassword = randomStr[0] + strMd5 + randomStr[1]; // Md5加左右分辨加5位随机串
		const user = await this.ctx.model.User.create({
			mobile,
			password: resultPassword,
		});
		return this.success(user, '注册成功');
	}

	/**
   * 根据id获取用户信息
   * @param {Number} id - 用户id
   * @return {Object} - 返回用户信息
   */
	async getUser(id) {
		const user = await this.ctx.model.User.findOne({
			where: {
				id,
			},
		});
		return user;
	}

	/**
   * 删除用户
   * @param {Number} id - 用户id
   * @return {Object} - 返回用户信息
   */
	async delete(id) {
		const user = await this.ctx.model.User.destroy({
			where: {
				id,
			},
		});
		return this.success(user, '删除成功');
	}
	/**
   * 修改账号密码
   * @param {String} username - 用户名
   * @param {String} password - 密码
   * @param {Number} id - 用户id
   * @return {Object} - 返回用户信息
   */
	async update(username, password, id) {
		const isExist = await this.isExist(username);
		if (isExist) {
			return this.error('该手机号已存在');
		}
		const user = await this.ctx.model.User.update({
			username,
			password,
		}, {
			where: {
				id,
			},
		});
		console.log(user);
		return this.success(user, '修改成功');
	}
	/**
   * 分页查询
   * @param {Number} page - 页
   * @param {Number} pageSize - 每页容量
   * @return {Object} - 返回用户列表
   */
	async getUserByPage(page, pageSize) {
		const users = await this.ctx.model.User.findAndCountAll({
			limit: pageSize,
			offset: (page - 1) * pageSize,
			where: {},
		});
		if (users.rows.length > 0) {
			return this.success(users, '查询成功');
		}
		return this.error('没有找到用户');
	}
	/**
	 * 获取5,5位随机字符串
	 * @return {Array} - 返回两个随机字符串的数组
	 */
	getRandStr2() {
		const STR = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
		let str1 = '';
		let str2 = '';
		for (let i = 0; i < 5; i++) {
			str1 += STR[Math.ceil(Math.random() * 36)];
			str2 += STR[Math.ceil(Math.random() * 36)];
		}
		return [ str1, str2 ];
	}
}

module.exports = RestfulService;
