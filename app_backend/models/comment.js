const Schema = require('mongoose').Schema;
module.exports = {
	name: "comment",
	schema: {
		content: {
			type: String,
			required: true
		}, // 内容
		ax: {
			type: Schema.Types.ObjectId,
			required: true
		}, // 斧头id
		username: {
			type: String,
			required: true
		}, // 昵称
		replyTo: String,// 回复至
		children: Array,// 回复
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