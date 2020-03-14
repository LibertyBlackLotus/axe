const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const tokenConfig = require('../config').tokenConfig;
const UserService = require('../services').UserService;
const {InvalidQueryError} = require('../lib/error');

module.exports = {
	/**
	 * 登录
	 * @param ctx username 用户名
	 * @param ctx password 密码
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'POST /api/login': async (ctx, next) => {
		const {username, password} = ctx.request.body;
		if (!username || !password) {
			throw new InvalidQueryError();
		}
		const user = await UserService.findOne({username});
		if (!user) {
			ctx.error = '用户不存在';
			ctx.code = 0
		}else if (!bcrypt.compareSync(password, user.password)) {
		 	ctx.error = '密码错误';
			ctx.code = 0;
		}else {
			ctx.result = {
				userInfo: user,
				token: jwt.sign({
					data: user._id,
					exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3), //设置 token 过期时间: 3d
				}, tokenConfig.secret)
			}
		}
		return next();
	},

	/**
	 * 注册
	 * @param ctx username 用户名
	 * @param ctx password 密码
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'POST /api/register': async (ctx, next) => {
		const data = ctx.request.body;
		if (!data.username || !data.password) {
			throw new InvalidQueryError()
		}
		let user = await UserService.findOne({username:data.username});
		if(user){
			ctx.error = '用户已存在';
			ctx.code = 0;
		} else {
			let salt = bcrypt.genSaltSync(10);
			data.password = bcrypt.hashSync(data.password, salt);  //密码加密
			let user = await UserService.save(data);
			ctx.result = {
				userInfo: user,
				token: jwt.sign({
					data: user._id,
					exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3), //设置 token 过期时间: 3d
				}, tokenConfig.secret)
			}
		}
		return next();
	},

	/**
	 * 获取用户列表
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/users': async (ctx, next) => {
		ctx.result = await UserService.findMany();
		// ctx.result = await UserService.findManyPopulateUser();
		return next();
	},

	/**
	 * 获取用户信息
	 * param ctx id 用户_id
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/users/:id': async (ctx, next) => {
		let {id} = ctx.params;
		if (!id) {
			throw new InvalidQueryError()
		}
		ctx.result = await UserService.findById(id);
		// ctx.result = await UserService.findByIdPopulate(id);
		return next();
	},

	/**
	 * 删除用户
	 * param ctx id 用户_id
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'DELETE /api/users/:id': async (ctx, next) => {
		let {id} = ctx.params;
		if (!id) {
			throw new InvalidQueryError()
		}
		ctx.result = await UserService.deleteById(id);
		return next();
	},

	/**
	 * 修改用户信息
	 * param ctx data 用户data
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'PUT /api/users': async (ctx, next) => {
		const data = ctx.request.body;
		if (!data || !data._id) {
			throw new InvalidQueryError()
		}
		let before = await UserService.updateById(data._id, data);
		if (!before) {
			ctx.error = '修改失败'
		} else {
			let after = await UserService.findById(data._id);
			ctx.result = {
				before,
				after
			};
		}
		return next();
	},
};
