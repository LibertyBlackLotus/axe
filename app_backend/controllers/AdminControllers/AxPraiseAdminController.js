const AxPraiseService = require('../../services').AxPraiseService;
const AxService = require('../../services').AxService;
const {InvalidQueryError} = require('../../lib/error');

module.exports = {
	/**
	 * 点赞
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'POST /api/axPraise': async (ctx, next) => {
		const data = ctx.request.body;
		if (!data.ax || !data.user) {
			throw new InvalidQueryError()
		}
		let result = await AxPraiseService.save(data);
		if (!result) {
			ctx.error = '保存失败';
		} else {
			AxService.updateById(data.ax, {$inc: {praises: 1}});
			ctx.result = result;
		}
		return next();
	},

	/**
	 * 删除一条点赞
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'DELETE /api/axPraise': async (ctx, next) => {
		const {ax, user} = ctx.request.body;
		if (!ax || !user) {
			throw new InvalidQueryError()
		}
		const result = await AxPraiseService.delete({ax, user});
		if (!result) {
			ctx.error = '记录不存在';
		} else {
			AxService.updateById(ax, {$inc: {praises: -1}});
			ctx.result = result;
		}
		return next();
	},

	/**
	 *  是否点赞了
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'POST /api/axPraise/isPraised': async (ctx, next) => {
		const {ax, user} = ctx.request.body;
		if (!ax || !user) {
			throw new InvalidQueryError()
		}
		const result = await AxPraiseService.findOne({ax, user});
		if (!result) {
			ctx.result = false;
		} else {
			ctx.result = true;
		}
		return next();
	}
}
