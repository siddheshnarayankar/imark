var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Candidate = new Schema(
	{
		cand_name: {
			type: String,
			required: false,
			trim: true
		},
		cand_age: {
			type: String,
			required: false,
			trim: true
		},
		cand_org_id: {
			type: String,
			required: false,
			trim: true
		},
		cand_dealer_id: {
			type: String,
			required: false,
			trim: true
		},
		cand_image_fold: {
			type: String,
			required: false,
			trim: true
		},
		cand_image_name: {
			type: String,
			required: false,
			trim: true
		}
	}
);

module.exports = mongoose.model('Candidate', Candidate);