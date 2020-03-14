const UserFriendService = require('../services').UserFriendService;
const {InvalidQueryError} = require('../lib/error');

module.exports = {
	/**
	 *  获取用户好友列表
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/userFriend/user/:user': async (ctx, next) => {
		const {user} = ctx.params;
		const result = await UserFriendService.findMany({user});
		if (!result) {
			ctx.error = '获取列表失败'
		} else {
			ctx.result = result;
		}
		return next();
	},

	/**
	 *  获取用户好友列表分页
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/userFriendByPage': async (ctx, next) => {
		const {user, pageNum, pageSize} = ctx.request.body;
		const result = await UserFriendService.findByPage({user}, pageNum, pageSize);
		if (!result) {
			ctx.error = '获取列表失败';
		} else {
			ctx.result = result;
		}
		return next();
	},

	/**
	 *  获取一条好友信息
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/userFriend/:id': async (ctx, next) => {
		const {id} = ctx.params;
		if (!id) {
			throw new InvalidQueryError();
		}
		const result = await UserFriendService.findById(id);
		if (!result) {
			ctx.error = '记录不存在';
		} else {
			ctx.result = result;
		}
		return next();
	},

	/**
	 *  是否关注了
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'POST /api/userFriend/isFollowed': async (ctx, next) => {
		const {user, friend} = ctx.request.body;
		if (!user || !friend) {
			throw new InvalidQueryError();
		}
		const result = await UserFriendService.findOne({user, friend});
		if (!result) {
			ctx.result = false;
		} else {
			ctx.result = true;
		}
		return next();
	}
}
