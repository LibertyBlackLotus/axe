const Schema = require('mongoose').Schema;
module.exports = {
	name: "search",
	schema: {
		keywords: {
			type: String,
			required: true
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true
		}, // 作者
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