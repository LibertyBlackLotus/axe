const UserFriendService = require('../../services').UserFriendService;
const UserService = require('../../services').UserService;
const {InvalidQueryError} = require('../../lib/error');

module.exports = {
	/**
	 * 关注好友
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'POST /api/userFriend': async (ctx, next) => {
		const data = ctx.request.body;
		if (!data) {
			throw new InvalidQueryError()
		}
		let result = await UserFriendService.save(data);
		if (!result) {
			ctx.error = '保存失败';
			ctx.code = 0;
		} else {
			UserService.updateById(data.friend, {$inc: {followed: 1}});
			ctx.result = result;
		}
		return next();
	},

	/**
	 * 删除关注好友
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'DELETE /api/userFriend': async (ctx, next) => {
		console.log('---userFriend----koa---->', ctx.request );
		const {user, friend} = ctx.request.body;
		if (!user || !friend) {
			throw new InvalidQueryError()
		}
		const result = await UserFriendService.delete({user, friend});
		if (!result) {
			ctx.error = '朋友不存在';
			ctx.code = 0;
		} else {
			UserService.updateById(friend, {$inc: {followed: -1}});
			ctx.result = result;
		}
		return next();
	}
}
