var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Candidate = new Schema(
	{
		cand_firstName: {
			type: String,
			required: false,
			trim: true
		},
		cand_MiddleName: {
			type: String,
			required: false,
			trim: true
		},
		cand_LastName: {
			type: String,
			required: false,
			trim: true
		},
		cand_DOB: {
			type: String,
			required: false,
			trim: true
		},
		cand_age: {
			type: String,
			required: false,
			trim: true
		},
		cand_blood_group: {
			type: String,
			required: false,
			trim: true
		},
			cand_gender: {
			type: String,
			required: false,
			trim: true
		},
			cand_phoneNumber: {
			type: String,
			required: false,
			trim: true
		},
		cand_phoneNumber: {
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