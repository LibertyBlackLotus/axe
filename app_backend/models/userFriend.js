const Schema = require('mongoose').Schema;
module.exports = {
	name: "user_friend",
	schema: {
		user: {
			type: Schema.Types.ObjectId,
			required: true
		}, // 用户
		friend: {
			type: Schema.Types.ObjectId,
			required: true
		}, // 关注的用户
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
