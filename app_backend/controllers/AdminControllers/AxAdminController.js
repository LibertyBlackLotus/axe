const AxService = require('../../services').AxService;
const UserService = require('../../services').UserService;
const ImgUploadService = require('../../services/fileService/ImgUploadService');
const {InvalidQueryError} = require('../../lib/error');

module.exports = {
	/**
	 * 创建一条斧头
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'POST /api/ax': async (ctx, next) => {
		const data = ctx.request.body;
		if (!data) {
			throw new InvalidQueryError()
		}
		let result = null;
		if (data._id) {
			result = await AxService.updateById(data._id, data);
		} else {
			result = await AxService.save(data);
			if(result.author){
				UserService.saveAx(result);
			}
		}
		if (!result) {
			ctx.error = '保存失败'
		} else {
			ctx.result = result;
		}
		return next();
	},

	/**
	 * 删除一条斧头
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'DELETE /api/ax/:id': async (ctx, next) => {
		const {id} = ctx.params;
		if (!id) {
			throw new InvalidQueryError()
		}
		const result = await AxService.deleteById(id);
		if (!result) {
			ctx.error = '斧头不存在';
		} else {
			ctx.result = result;
		}
		return next();
	},

	/**
	 * 修改斧头
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	'PUT /api/ax': async (ctx, next) => {
		const data = ctx.request.body;
		if (!data || !data._id) {
			throw new InvalidQueryError();
		}
		const before = await AxService.updateById(data._id, data);
		if (!before) {
			ctx.error = '保存更改失败';
		} else {
			let after = await AxService.findById(data._id);
			ctx.result = {
				before,
				after
			};
		}
		return next();
	},

	'POST /api/uploadArticleImg': async (ctx, next) => {
		//按月存放上传的图片
		const date = new Date();
		const year = date.getFullYear();
		const month = (Array(2).join(0) + (date.getMonth() + 1)).slice(-2);
		const uploadPath = `/img/${year}/${month}`;

		const imgUploadService = new ImgUploadService(uploadPath);
		imgUploadService.execute(ctx);
		return next();
	},
}
