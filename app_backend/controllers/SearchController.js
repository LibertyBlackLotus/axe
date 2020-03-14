const SearchService = require('../services').SearchService;
const {InvalidQueryError} = require('../lib/error');

module.exports = {
	/**
	 *  获取所有搜索记录
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/search': async (ctx, next) => {
		const result = await SearchService.findMany();
		if (!result) {
			ctx.error = '获取列表失败'
		} else {
			ctx.result = result;
		}
		return next();
	},

	/**
	 *  获取单个用户搜索记录
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/search/user/:user': async (ctx, next) => {
		const {user} = ctx.params;
		const result = await SearchService.findMany({user});
		if (!result) {
			ctx.error = '获取列表失败'
		} else {
			ctx.result = result;
		}
		return next();
	},
	/**
	 *  获取一条搜索记录
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/search/:id': async (ctx, next) => {
		const {id} = ctx.params;
		if (!id) {
			throw new InvalidQueryError();
		}
		const result = await SearchService.findById(id);
		if (!result) {
			ctx.error = '记录不存在';
		} else {
			ctx.result = result;
		}
		return next();
	}
}
