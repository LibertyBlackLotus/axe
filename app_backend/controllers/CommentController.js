const CommentService = require('../services').CommentService;
const {InvalidQueryError} = require('../lib/error');

module.exports = {
	/**
	 * 获取斧头评论
	 * @param ctx
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'GET /api/comment/:ax': async (ctx, next) => {
		const {ax} = ctx.params;
		if (!ax) {
			throw new InvalidQueryError();
		}
		const result = await CommentService.findMany({ax});
		if (!result) {
			ctx.error = '获取评论失败';
		} else {
			ctx.result = result;
		}
		return next();
	}

}
