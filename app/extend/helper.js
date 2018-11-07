'use strict';

module.exports = {
	/**
   * 生成 Token
   * @param {Object} data - 用户id对象
   * @return {String} - 返回token
   */
	createToken(data) {
		const { app } = this;
		let token = app.jwt.sign(data, app.config.jwt.secret, {
			expiresIn: '12h',
		});
		// 加盐
		token = token.split('.');
		const strs = this.getRandStr();
		token = token[0] + '.' + token[1] + strs[1] + '.' + strs[0] + token[2] + strs[2];
		return token;
	},

	getAccessToken(ctx) {
		const Token = ctx.request.header.authorization;
		console.log(Token);
		return Token;
	},
	async verifyToken(ctx, userId) {
		const token = this.getAccessToken(ctx);
		const verifyResult = await ctx.service.token.verifyToken(token);
		if (!verifyResult) {
			return {
				state: false,
				message: 'Token校验失败',
			};
		}
		if (userId !== verifyResult.id) {
			return {
				state: false,
				message: 'Token和用户不符',
			};
		}
		return {
			state: true,
			message: 'Token验证成功',
		};
	},
	getRandStr() {
		const STR = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
		const str1 = STR[Math.ceil(Math.random() * 36)] + STR[Math.ceil(Math.random() * 36)] + STR[Math.ceil(Math.random() * 36)];
		const str2 = STR[Math.ceil(Math.random() * 36)] + STR[Math.ceil(Math.random() * 36)] + STR[Math.ceil(Math.random() * 36)];
		const str3 = STR[Math.ceil(Math.random() * 36)] + STR[Math.ceil(Math.random() * 36)] + STR[Math.ceil(Math.random() * 36)] + STR[Math.ceil(Math.random() * 36)];
		return [ str1, str2, str3 ];
	},
	// 解除加盐
	decrypt(token) {
		const realToken = token.split('.');
		realToken[1] = realToken[1].slice(0, -3);
		realToken[2] = realToken[2].slice(3, -3);
		return realToken[0] + '.' + realToken[1] + '.' + realToken;
	},
}
;
