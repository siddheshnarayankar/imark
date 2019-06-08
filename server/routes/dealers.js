'use strict';
var router = require('express').Router();

exports = module.exports = function (app) {


		router.get('/dealers', function (req, res, next) {
		console.log(req.params.id)
		app.models.Dealer.find({})
		.select('orgName  orgURLPrfix')
			.exec(function (err, dealers) {
				if (err) next(err);

				res.status(200)
					.json(dealers || []);
			});
	});
	router.get('/orglist/:id', function (req, res, next) {
		//console.log(req.params.id)
		app.models.Dealer.find({ dealer_id: req.params.id })
			.exec(function (err, dealers) {
				if (err) next(err);

				res.status(200)
					.json(dealers || []);
			});
	});
	//New
		router.get('/collegeDetails/:id', function (req, res, next) {
		//console.log(req.params.id)
		app.models.Dealer.find({ _id: req.params.id })
			.exec(function (err, dealers) {
				if (err) next(err);

				res.status(200)
					.json(dealers || []);
			});
	});
			router.get('/getUrlPrfix/:orgURLName', function (req, res, next) {
		//console.log(req.params.id)
		app.models.Dealer.find({ orgURLName: req.params.orgURLName })
		.select('orgURLPrfix')
			.exec(function (err, dealers) {
				if (err) next(err);

				res.status(200).json(dealers || []);
			});
	});
	router.put('/:id', function (req, res, next) {
		var data = {
			orgName: req.body.orgName,
			orgAdd: req.body.orgAdd,
			//orgStdCount: req.body.orgStdCount,
			ordersField: req.body.orders,
		//	orgURLPrfix: makeURI(),
		 
		};
		app.models.Dealer.findOneAndUpdate({ _id: req.params.id }, data, { new: true }, function (err, dealer) {
			if (err) return next(err);

			res.status(200).json({
				dealer: dealer,
				message: 'dealer status has been updated successfully.',
				status:true
			});

		});
	});


	router.post('/', function (req, res, next) {
		function makeURI() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for (var i = 0; i < 10; i++)
				text += possible.charAt(Math.floor(Math.random() * possible.length));

			return text;
		}
		function makeid() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for (var i = 0; i < 5; i++)
				text += possible.charAt(Math.floor(Math.random() * possible.length));

			return text;
		}
		var arr = [];
		for (var i = 0; i < req.body.orgStdCount; ++i) {
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
			orgName: req.body.orgName,
			orgAdd: req.body.orgAdd,
			orgPhoneNumber: req.body.orgPhoneNumber,
			orgIDLayout: req.body.orgIDLayout,
			orgStdCount: req.body.orgStdCount,
			ordersField: req.body.orders,
			orgURLPrfix: makeURI(),
			orgURLName:req.body.orgURLName,
			stud_token: arr,
			dealer_id: req.body.dealer_id,
			status: false
		};
		app.models.Dealer.create(data, function (err, dealer) {
			if (err) next(err);
			console.log(data);
			res.status(200).json({
				dealer: dealer,
				message: 'College has been added successfully.'
			});

		});
	});

	router.put('/updateStdTStatus/:id', function (req, res, next) {
		var data = {
			status: true
		};
		app.models.Dealer.findOneAndUpdate({ _id: req.params.id }, data, { new: true }, function (err, dealer) {
			if (err) return next(err);

			res.status(200).json({
				dealer: dealer,
				message: 'dealer status has been updated successfully.'
			});

		});
	});

	router.delete('/:id', function (req, res, next) {
		app.models.Dealer.findOneAndRemove({ _id: req.params.id }, function (err) {
			if (err) next(err);

			res.status(200).json({
				message: 'Orgnization has been deleted successfully.'
			})
		});
	});





	router.get('/:orgURLPrfix', function (req, res, next) {
		app.models.Dealer.findOne({ orgURLPrfix: req.params.orgURLPrfix })
			.exec(function (err, dealers) {
				if (err) next(err);

				res.status(200)
					.json(dealers || []);
			});
	});


    router.get('/:urlLink/:passcode', function (req, res, next) {
        // console.log(req.params.std_d_id);
        //  let id = req.params.id;
        app.models.Dealer.aggregate([
            // Get just the docs that contain a shapes element where color is 'red'
            { $match: { 'orgURLPrfix': req.params.urlLink}},
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
            .exec(function (err, dealers) {
                if (err) next(err);

                res.status(200)
                    .json(dealers || []);
            });
        // app.models.Studenttoken.findOne({ stud_dealer_id: '5c51e18664ad441c4cf7b7ef', "stud_token": { "status": false, "code": 0.412537029854332 } })

    });


    router.put('/codestatus/:urlLink/:passcode', function (req, res, next) {
        // var data = {
        //     status: true
        // };

        app.models.Dealer.updateOne(
            { 'orgURLPrfix': req.params.urlLink, "stud_token.code": req.params.passcode },
            { $set: { "stud_token.$.status": false } }, function (err, dealers) {
                if (err) return next(err);

                res.status(200).json({
                    dealers: dealers,
                    message: 'dealers status has been updated successfully.'
                });

            });
      
    });

	return router;
};