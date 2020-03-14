const AxCollectionService = require('../../services').AxCollectionService;
const AxService = require('../../services').AxService;
const {InvalidQueryError} = require('../../lib/error');

module.exports = {
	/**
	 * 创建一条收藏
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'POST /api/axCollection': async (ctx, next) => {
		const data = ctx.request.body;
		if (!data.ax || !data.user) {
			throw new InvalidQueryError()
		}
		let result = await AxCollectionService.save(data);
		if (!result) {
			ctx.error = '保存失败';
		} else {
			AxService.updateById(data.ax, {$inc: {collections: 1}});
			ctx.result = result;
		}
		return next();
	},

	/**
	 * 删除一条收藏
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'DELETE /api/axCollection': async (ctx, next) => {
		const {ax, user} = ctx.request.body;
		if (!ax || !user) {
			throw new InvalidQueryError()
		}
		const result = await AxCollectionService.delete({ax, user});
		if (!result) {
			ctx.error = '收藏不存在';
		} else {
			AxService.updateById(ax, {$inc: {collections: -1}});
			ctx.result = result;
		}
		return next();
	},

	/**
	 *  是否收藏了
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'POST /api/axCollection/isCollected': async (ctx, next) => {
		const {ax, user} = ctx.request.body;
		if (!ax || !user) {
			throw new InvalidQueryError()
		}
		const result = await AxCollectionService.findOne({ax, user});
		if (!result) {
			ctx.result = false;
		} else {
			ctx.result = true;
		}
		return next();
	}


}
