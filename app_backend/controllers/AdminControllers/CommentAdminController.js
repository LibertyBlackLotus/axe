const CommentService = require('../../services').CommentService;
const {InvalidQueryError} = require('../../lib/error');

module.exports = {
	/**
	 * 添加评论
	 * @param ctx
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'POST /api/comment': async (ctx, next) => {
		const data = ctx.request.body;
		if (!data) {
			throw new InvalidQueryError()
		}
		const result = await CommentService.save(data);
		if (!result) {
			ctx.error = '添加失败';
		} else {
			const list = await CommentService.findMany({ax: data.ax});
			ctx.result = list;
		}
		return next()
	},

	/**
	 * 删除一条评论
	 * @param ctx
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'DELETE /api/comment/:id': async (ctx, next) => {
		const {id} = ctx.params;
		if (!id) {
			throw new InvalidQueryError()
		}
		const result = await CommentService.deleteById(id);
		if (!result) {
			ctx.error = '评论不存在';
		} else {
			const list = await CommentService.findMany({ax: result.ax});
			ctx.result = list;
		}
		return next();
	}
}
