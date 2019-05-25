var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Dealer = new Schema(
	{
		name: {
			type: String,
			required: false,
			trim: true
		},
		location: {
			type: String,
			required: false,
			trim: true
		},
		curr_dealer_id: {
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

module.exports = mongoose.model('Dealer', Dealer);