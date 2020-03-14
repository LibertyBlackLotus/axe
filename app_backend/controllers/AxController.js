const AxService = require('../services').AxService;
const UserFriendService = require('../services').UserFriendService;
const {InvalidQueryError} = require('../lib/error');

module.exports = {
	/**
	 *  获取所有斧头
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/ax': async (ctx, next) => {
		const result = await AxService.findManyPopulate({state: 1});
		if (!result) {
			ctx.error = '获取列表失败'
		} else {
			ctx.result = result;
		}
		return next();
	},

	/**
	 *  获取单个用户所有斧头
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/ax/user/:author': async (ctx, next) => {
		const {author} = ctx.params;
		const result = await AxService.findMany({author});
		if (!result) {
			ctx.error = '获取列表失败'
		} else {
			ctx.result = result;
		}
		return next();
	},

	/**
	 *  获取所有斧头 分页
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/axByPage': async (ctx, next) => {
		const {pageNum, pageSize} = ctx.request.body;
		const result = await AxService.findByPage({state: 1}, pageNum, pageSize);
		if (!result) {
			ctx.error = '获取列表失败';
		} else {
			ctx.result = result;
		}
		return next();
	},

	/**
	 *  获取关注的用户斧头列表
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/ax/userFocus/:user': async (ctx, next) => {
		const {user} = ctx.params;
		let friends = await UserFriendService.findMany({user});
		let friendsId = [];
		friends.forEach((item) => {
			friendsId.push(item.friend);
		});
		const result = await AxService.findManyPopulate({ author: friendsId });
		if (!result) {
			ctx.error = '获取列表失败'
		} else {
			ctx.result = result;
		}
		return next();
	},

	/**
	 *  获取一条斧头信息
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/ax/:id': async (ctx, next) => {
		const {id} = ctx.params;
		if (!id) {
			throw new InvalidQueryError();
		}
		const result = await AxService.findByIdPopulate(id);
		if (!result) {
			ctx.error = '斧头不存在';
		} else {
			ctx.result = result;
		}
		return next();
	},

	/**
	 *  搜索斧头
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'POST /api/ax/search': async (ctx, next) => {
		const {keywords} = ctx.request.body;
		if (!keywords) {
			throw new InvalidQueryError();
		}
		let reg = new RegExp(keywords, 'i'); //不区分大小写
		const result = await AxService.findMany({
			$or : [ //多条件，数组 模糊查询
				{title : {$regex : reg}},
				{content : {$regex : reg}}
			]
		});
		if (!result) {
			ctx.error = '无结果';
		} else {
			ctx.result = result;
		}
		return next();
	},
}
