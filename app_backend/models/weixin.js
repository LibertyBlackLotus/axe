const Schema = require('mongoose').Schema;
module.exports = {
	name: "weixin",
	schema: {
		openId: {
			type: String,
			required: true
		}, // 微信id
		accessToken: String,     //token
		avatar: String,          //头像
		phone_num: String,       //电话号码
		last_login_time: String, //上次登录时间
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
