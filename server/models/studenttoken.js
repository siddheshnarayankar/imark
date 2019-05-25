var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Studenttoken = new Schema(
    {
        stud_token: {
            type: Array,
            required: false,
            trim: true
        },
        stud_token_status: {
            type: String,
            required: false,
            trim: true
        },
        stud_org_id: {
            type: String,
            required: false,
            trim: true
        },
        stud_dealer_id: {
            type: String,
            required: false,
            trim: true
        },
        stud_uid: {
            type: String,
            required: false,
            trim: true
        }
    }
);

module.exports = mongoose.model('Studenttoken', Studenttoken);