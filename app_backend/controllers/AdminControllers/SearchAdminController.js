const SearchService = require('../../services').SearchService;
const {InvalidQueryError} = require('../../lib/error');

module.exports = {
	/**
	 * 添加一条搜索记录
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'POST /api/search': async (ctx, next) => {
		const data = ctx.request.body;
		if (!data) {
			throw new InvalidQueryError()
		}
		let result = await SearchService.save(data);
		if (!result) {
			ctx.error = '保存失败';
			ctx.code = 0;
		} else {
			ctx.result = result;
		}
		return next();
	},

	/**
	 * 删除一条搜索记录
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'DELETE /api/search/:id': async (ctx, next) => {
		const {id} = ctx.params;
		if (!id) {
			throw new InvalidQueryError()
		}
		const result = await SearchService.deleteById(id);
		if (!result) {
			ctx.error = '记录不存在';
		} else {
			ctx.result = result;
		}
		return next();
	}
}
