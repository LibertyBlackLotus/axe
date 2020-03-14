/**
 * 获取用户信息
 * @returns {null}
 */
const getUserInfo = () => {
	let userInfo = uni.getStorageSync('userInfo');
	return userInfo != null ? JSON.parse(userInfo) : null;
}

/**
 *
 * @returns string id
 */
const getUserId = () => {
	let userInfo = uni.getStorageSync('userInfo');
	return userInfo != null ? JSON.parse(userInfo)._id : '';
};

const padLeftZero = (str) => {
	return ('00' + str).substr(str.length);
};
const formatDate = (date, fmt) => {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
};

module.exports = {
	getUserInfo,
	getUserId,
	formatDate
}
