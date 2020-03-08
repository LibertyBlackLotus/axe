const BaseDAO = require('../lib/baseDAO');
const User = require('../models').user;

class UserService extends BaseDAO {
	constructor(model) {
		super(model);
	}

	/**
	 * 条件查询 populate
	 * @param {Object} condition 查询条件
	 * @return {Array} 查询结果
	 */
	async findManyPopulateUser(condition) {
		const result = await this.model.find(condition).sort({create_time: -1}).populate('ax');
		return result;
	}

	/**
	 * 查询 populate
	 * @param {Object} id 查询条件
	 * @return {Array} 查询结果
	 */
	async findByIdPopulate(id) {
		const result = await this.model.findById(id).populate('ax');
		return result;
	}

	/**
	 * 新增 populate user ax
	 * @param {Object} data Json数据
	 * @return {Object} 新增的数据
	 */
	async saveAx(data) {
		let _id = data.author? data.author: 0;
		const result = await this.model.findById(_id, (err, user) => {
			user.ax.push(data);
			user.save();
		});
		return result;
	}

}

module.exports = new UserService(User);
