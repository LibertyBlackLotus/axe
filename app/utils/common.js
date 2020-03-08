/**
 * 获取用户信息
 * @returns {null}
 */
const getUserInfo = () => {
	let userInfo = uni.getStorageSync('userInfo');
	return userInfo != null ? userInfo : null;
}

/**
 *
 * @returns string id
 */
const getUserId = () => {
	let userInfo = uni.getStorageSync('userInfo');
	return userInfo != null ? userInfo._id : '';
};
 

module.exports = {
	getUserInfo,
	getUserId, 
}
