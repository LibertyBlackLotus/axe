const BaseDAO = require('../lib/baseDAO');
const Search = require('../models').search;

class SearchService extends BaseDAO {
	constructor(model) {
		super(model)
	}

}

module.exports = new SearchService(Search);
