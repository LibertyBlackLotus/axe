const AxService = require('../services').AxService;
const {InvalidQueryError} = require('../lib/error');

module.exports = {
	/**
	 *  获取所有斧头
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/ax': async (ctx, next) => {
		const result = await AxService.findManyPopulate();
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
		const result = await AxService.findManyByUser(author);
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
}
