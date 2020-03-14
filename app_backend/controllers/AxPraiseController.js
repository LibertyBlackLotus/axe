const AxPraiseService = require('../services').AxPraiseService;
const {InvalidQueryError} = require('../lib/error');

module.exports = {
	/**
	 *  获取所有点赞
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/axPraise': async (ctx, next) => {
		const result = await AxPraiseService.findMany();
		if (!result) {
			ctx.error = '获取列表失败'
		} else {
			ctx.result = result;
		}
		return next();
	},

	/**
	 *  获取单个用户点赞
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/axPraise/user/:user': async (ctx, next) => {
		const {user} = ctx.params;
		const result = await AxPraiseService.findMany({user});
		if (!result) {
			ctx.error = '获取列表失败'
		} else {
			ctx.result = result;
		}
		return next();
	},

	/**
	 *  获取所有点赞 分页
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/axPraiseByPage': async (ctx, next) => {
		const {pageNum, pageSize} = ctx.request.body;
		const result = await AxPraiseService.findByPage({}, pageNum, pageSize);
		if (!result) {
			ctx.error = '获取列表失败';
		} else {
			ctx.result = result;
		}
		return next();
	},

	/**
	 *  获取一条点赞
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/axPraise/:id': async (ctx, next) => {
		const {id} = ctx.params;
		if (!id) {
			throw new InvalidQueryError();
		}
		const result = await AxPraiseService.findById(id);
		if (!result) {
			ctx.error = '记录不存在';
		} else {
			ctx.result = result;
		}
		return next();
	}
}
