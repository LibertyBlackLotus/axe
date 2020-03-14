const BaseDAO = require('../lib/baseDAO');
const AxRead = require('../models').ax_read;

class AxReadService extends BaseDAO {
	constructor(model) {
		super(model)
	}

}

module.exports = new AxReadService(AxRead);
