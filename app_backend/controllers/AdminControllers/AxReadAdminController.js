const AxReadService = require('../../services').AxReadService;
const AxService = require('../../services').AxService;
const {InvalidQueryError} = require('../../lib/error');

module.exports = {
	/**
	 * 创建一条阅读记录
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'POST /api/axRead': async (ctx, next) => {
		const data = ctx.request.body;
		if (!data) {
			throw new InvalidQueryError()
		}
		let result = await AxReadService.save(data);
		if (!result) {
			ctx.error = '保存失败';
			ctx.code = 0;
		} else {
			AxService.updateById(data.ax, {$inc: {reads: 1}});
			ctx.result = result;
		}
		return next();
	},

	/**
	 * 删除一条阅读记录
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'DELETE /api/axRead/:id': async (ctx, next) => {
		const {id} = ctx.params;
		if (!id) {
			throw new InvalidQueryError()
		}
		const result = await AxReadService.deleteById(id);
		if (!result) {
			ctx.error = '记录不存在';
		} else {
			ctx.result = result;
		}
		return next();
	}
}
