const BaseDAO = require('../lib/baseDAO');
const UserFriend = require('../models').user_friend;

class UserFriendService extends BaseDAO {
	constructor(model) {
		super(model)
	}
}

module.exports = new UserFriendService(UserFriend);
