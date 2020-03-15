const AxReadService = require('../services').AxReadService;
const AxService = require('../services').AxService;
const {InvalidQueryError} = require('../lib/error');

module.exports = {
	/**
	 *  获取所有斧头阅读记录
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/axRead': async (ctx, next) => {
		const result = await AxReadService.findMany();
		if (!result) {
			ctx.error = '获取列表失败'
		} else {
			ctx.result = result;
		}
		return next();
	},

	/**
	 *  获取单个用户阅读记录
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/axRead/user/:user': async (ctx, next) => {
		const {user} = ctx.params;
		const result = await AxReadService.findMany({user});
		// let axIds = [];
		// result.forEach((item) => {
		// 	axIds.push(item.ax);
		// });
		// const axs = await AxService.findManyPopulate({state: 1, _id: axIds});
		if (!result) {
			ctx.error = '获取列表失败'
		} else {
			ctx.result = result;
		}
		return next();
	},

	/**
	 *  获取所有斧头阅读记录 分页
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/axReadByPage': async (ctx, next) => {
		const {pageNum, pageSize} = ctx.request.body;
		const result = await AxReadService.findByPage({}, pageNum, pageSize);
		if (!result) {
			ctx.error = '获取列表失败';
		} else {
			ctx.result = result;
		}
		return next();
	},

	/**
	 *  获取一条阅读记录
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/axRead/:id': async (ctx, next) => {
		const {id} = ctx.params;
		if (!id) {
			throw new InvalidQueryError();
		}
		const result = await AxReadService.findById(id);
		if (!result) {
			ctx.error = '记录不存在';
		} else {
			ctx.result = result;
		}
		return next();
	}
}
