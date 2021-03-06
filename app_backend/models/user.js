const Schema = require('mongoose').Schema;
module.exports = {
	name: "user",
	schema: {
		username: {
			type: String,
			required: true
		}, // 用户名
		password: {
			type: String,
			required: true
		}, // 密码
		weixin: {
			type: Schema.Types.ObjectId,
			ref: 'weixin'
		},
		followed: {
			type: Number,
			default: 0
		},
		accessToken: String,  //token
		avatar: String,   //头像
		nickname: String, // 昵称
		phone_num: String, // 电话号码
		email: String,     // 邮箱
		birthday: String,  // 生日
		gender: String,    //性别
		last_login_time: String, // 上次登录时间
		create_time: {
			type: Date,
			default: Date.now
		}, // 创建时间
		update_time: {
			type: Date,
			default: Date.now
		}, // 修改时间
		ax: [{ type: Schema.Types.ObjectId, ref: 'ax' }]
	},
	options: {
		versionKey: false,
		timestamps: {createdAt: 'create_time', updatedAt: 'update_time'}
	}
};
