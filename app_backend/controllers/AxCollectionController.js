const AxCollectionService = require('../services').AxCollectionService;
const AxService = require('../services').AxService;
const {InvalidQueryError} = require('../lib/error');

module.exports = {
	/**
	 *  获取用户收藏
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/axCollection/user/:user': async (ctx, next) => {
		const {user} = ctx.params;
		const result = await AxCollectionService.findMany({user});
		let axIds = [];
		result.forEach((item) => {
			axIds.push(item.ax);
		});
		const axs = await AxService.findManyPopulate({state: 1, _id: axIds});
		if (!axs) {
			ctx.error = '获取列表失败'
		} else {
			ctx.result = axs;
		}
		return next();
	},

	/**
	 *  获取用户收藏 分页
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/axCollectionByPage': async (ctx, next) => {
		const {pageNum, pageSize} = ctx.request.body;
		const result = await AxCollectionService.findByPage({}, pageNum, pageSize);
		if (!result) {
			ctx.error = '获取列表失败';
		} else {
			ctx.result = result;
		}
		return next();
	},

	/**
	 *  获取一条收藏
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/axCollection/:id': async (ctx, next) => {
		const {id} = ctx.params;
		if (!id) {
			throw new InvalidQueryError();
		}
		const result = await AxCollectionService.findById(id);
		if (!result) {
			ctx.error = '收藏不存在';
		} else {
			ctx.result = result;
		}
		return next();
	},
}
