'use strict';
var router = require('express').Router();

exports = module.exports = function (app) {


    router.get('/:current_Org_id', function (req, res, next) {
        app.models.Studenttoken.find({ stud_org_id: req.params.current_Org_id })
            .exec(function (err, studenttokens) {
                if (err) next(err);

                res.status(200).json({
                    studenttokens: studenttokens || [],
                    message: 'studenttokens status has been updated successfully.'
                });
            });
    });



    router.put('/codestatus/:std_d_id/:std_o_id/:passcode', function (req, res, next) {
        // var data = {
        //     status: true
        // };

        app.models.Studenttoken.updateOne(
            { stud_dealer_id: req.params.std_d_id, stud_org_id: req.params.std_o_id, "stud_token.code": req.params.passcode },
            { $set: { "stud_token.$.status": false } }, function (err, studenttokens) {
                if (err) return next(err);

                res.status(200).json({
                    studenttokens: studenttokens,
                    message: 'studenttokens status has been updated successfully.'
                });

            });
        // app.models.Dealer.findOneAndUpdate({}, data, { new: true }, function (err, dealer) {
        //     if (err) return next(err);

        //     res.status(200).json({
        //         dealer: dealer,
        //         message: 'dealer status has been updated successfully.'
        //     });

        // });
    });


    router.get('/tokenStatus/:id', function (req, res, next) {
        app.models.Studenttoken.find({ stud_org_id: req.params.id })
            .exec(function (err, studenttokens) {
                if (err) next(err);

                res.status(200)
                    .json(studenttokens || []);
            });
    });


    router.get('/:std_d_id/:std_o_id/:passcode', function (req, res, next) {
        console.log(req.params.std_d_id);
        //  let id = req.params.id;
        app.models.Studenttoken.aggregate([
            // Get just the docs that contain a shapes element where color is 'red'
            { $match: { 'stud_dealer_id': req.params.std_d_id, 'stud_org_id': req.params.std_o_id, 'stud_token.code': req.params.passcode } },
            {
                $project: {
                    stud_token: {
                        $filter: {
                            input: '$stud_token',
                            as: 'token',
                            cond: { $eq: ['$$token.code', req.params.passcode] },

                        }
                    }
                }
            }
        ])
            .exec(function (err, studenttokens) {
                if (err) next(err);

                res.status(200)
                    .json(studenttokens || []);
            });
        // app.models.Studenttoken.findOne({ stud_dealer_id: '5c51e18664ad441c4cf7b7ef', "stud_token": { "status": false, "code": 0.412537029854332 } })

    });

    router.post('/', function (req, res, next) {
        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }
        var arr = [];
        for (var i = 0; i < req.body.stud_count; ++i) {
            //     let s =  req.body.stud_org_id + '.' + req.body.stud_dealer_id;
            //     let buff = new Buffer(s);
            //     let base64data = buff.toString('base64');
            //    let buff1 = new Buffer(base64data, 'base64');  
            //     let text = buff1.toString('ascii');
            //      console.log(base64data);
            //     console.log(text);
            // let nu = Math.random();

            arr.push({ 'code': makeid(), 'status': true });
        }

        var data = {
            stud_token: arr,
            stud_token_status: true,
            stud_org_id: req.body.stud_org_id,
            stud_dealer_id: req.body.stud_dealer_id,
            stud_uid: req.body.stud_dealer_id + '.' + req.body.stud_org_id
        };
        app.models.Studenttoken.create(data, function (err, studenttoken) {
            if (err) next(err);

            res.status(200).json({
                studenttoken: studenttoken,
                message: 'Token  has been genrated successfully.'
            });

        });
    });
    return router;
}