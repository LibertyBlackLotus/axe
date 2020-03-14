const BaseDAO = require('../lib/baseDAO');
const AxPraise = require('../models').ax_praise;

class AxPraiseService extends BaseDAO {
	constructor(model) {
		super(model)
	}
}

module.exports = new AxPraiseService(AxPraise);
