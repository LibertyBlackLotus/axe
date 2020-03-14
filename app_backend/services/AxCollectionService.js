const BaseDAO = require('../lib/baseDAO');
const AxCollection = require('../models').ax_collection;

class AxCollectionService extends BaseDAO {
	constructor(model) {
		super(model)
	}

}

module.exports = new AxCollectionService(AxCollection);
