const Schema = require('mongoose').Schema;
module.exports = {
	name: "ax",
	schema: {
		ax: {
			type: Array,
			required: true
		},  //斧头图片地址
		title: {
			type: String,
			required: true
		}, // 标题
		author: {
			type: Schema.Types.ObjectId,
			ref: 'user'
		}, // 作者
		content: {
			type: String
		}, // 内容
		abstract: String,  //摘要
		category: String,  //分类
		state: Number,     //0:草稿, 1:已发布, 2:已撤销
		create_time: {
			type: Date,
			default: Date.now
		}, // 创建时间
		update_time: {
			type: Date,
			default: Date.now
		}, // 修改时间
	},
	options: {
		versionKey: false,
		timestamps: {createdAt: 'create_time', updatedAt: 'update_time'}
	}
};