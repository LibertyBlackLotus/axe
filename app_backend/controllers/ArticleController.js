const ArticleService = require('../services').ArticleService;
const {InvalidQueryError} = require('../lib/error');

module.exports = {
	'GET /api/articles': async (ctx, next) => {
		const result = await ArticleService.findMany();

		if (!result) {
			ctx.error = '获取列表失败'
		} else {
			ctx.result = result
		}
		return next();
	},

	'GET /api/articlesByPage': async (ctx, next) => {
		const {pageNum, pageSize} = ctx.request.body;
		const result = await ArticleService.findByPage({state: 1}, pageNum, pageSize);
		if (!result) {
			ctx.error = '获取列表失败'
		} else {
			ctx.result = result
		}
		return next()
	},

	'GET /api/articles/:id': async (ctx, next) => {
		const {_id} = ctx.request.body;
		if (!_id) {
			throw new InvalidQueryError();
		}
		const result = await ArticleService.findById(_id)
		if (!result) {
			ctx.error = '文章不存在'
		} else {
			ctx.result = result
		}
		return next()
	},
}
