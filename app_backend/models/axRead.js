const Schema = require('mongoose').Schema;
module.exports = {
	name: "ax_read",
	schema: {
		ax: {
			type: Schema.Types.ObjectId,
			ref: 'ax'
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user'
		}, // 作者
		title: {
			type: String,
			require: true
		},
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