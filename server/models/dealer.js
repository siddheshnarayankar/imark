var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Dealer = new Schema(
	{
		orgName: {
			type: String,
			required: false,
			trim: true
		},
		orgAdd: {
			type: String,
			required: false,
			trim: true
		},
				orgPhoneNumber: {
			type: String,
			required: false,
			trim: true
		},
				orgIDLayout: {
			type: String,
			required: false,
			trim: true
		},
		orgStdCount: {
			type: String,
			required: false,
			trim: true
		},
		ordersField: {
			type: Array,
			required: false,
			trim: true
		},
		stud_token: {
			type: Array,
			required: false,
			trim: true
		},
		dealer_id: {
			type: String,
			required: false,
			trim: true
		},
		orgURLPrfix: {
			type: String,
			required: false,
			trim: true
		},
		orgURLName: {
			type: String,
			required: false,
			trim: true
		},
		status: {
			type: String,
			required: false,
			trim: true
		}
	}
);

module.exports = mongoose.model('College', Dealer);