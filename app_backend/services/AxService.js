const BaseDAO = require('../lib/baseDAO');
const Ax = require('../models').ax;

class AxService extends BaseDAO {
	constructor(model) {
		super(model)
	}

	/**
	 * 条件查询，多个结果
	 * @param {Object} condition 查询条件
	 * @return {Array} 查询结果
	 */
	async findManyPopulate(condition) {
		const result = await this.model.find(condition).sort({create_time: -1}).populate('author').exec();
		return result;
	}

	/**
	 * 查询用户斧头列表
	 * @param author 用户_id
	 * @return {Array} 查询结果
	 */
	async findManyByUser(author) {
		const result = await this.model.find({author}).sort({create_time: -1}).exec();
		return result;
	}

	/**
	 * id查询 populate
	 * @param {String} id
	 * @return {Object} 查询结果
	 */
	async findByIdPopulate(id) {
		const result = await this.model.findById(id).populate('author');
		return result;
	}

}

module.exports = new AxService(Ax);
