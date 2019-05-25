'use strict';
var router = require('express').Router();

exports = module.exports = function(app) {
	router.get('/orglist/:id', function(req, res, next) {
		console.log(req.params.id)
		app.models.Dealer.find({ curr_dealer_id: req.params.id })
			.exec(function(err, dealers) {
				if(err) next(err);
				
				res.status(200)
				.json(dealers || []);
			});
	});
	router.post('/', function(req, res, next) {
		var data = {
			name: req.body.name,
			location: req.body.location,
			curr_dealer_id: req.body.curr_dealer_id,
			status:false
		};
		app.models.Dealer.create(data, function(err, dealer) {
			if(err) next(err);
 console.log(data);
			res.status(200).json({
				dealer: dealer,
				message: 'College has been added successfully.'
			});

		});
	});

	router.put('/updateStdTStatus/:id', function(req, res, next) {
		var data = {
			 status:true
		};
		app.models.Dealer.findOneAndUpdate({_id: req.params.id}, data, {new: true}, function(err, dealer) {
			if(err) return next(err);
			
			res.status(200).json({
				dealer: dealer,
				message: 'dealer status has been updated successfully.'
			});

		});
	});

	router.delete('/:id',function(req,res,next){
		app.models.Dealer.findOneAndRemove({_id: req.params.id},function(err){
			if(err) next(err);

			res.status(200).json({
				message: 'Orgnization has been deleted successfully.'
			})
		});
	});


	


 	router.get('/:id', function(req, res, next) {
		app.models.Dealer.findOne({_id:req.params.id})
			.exec(function(err, dealers) {
				if(err) next(err);
				
				res.status(200)
				.json(dealers || []);
			});
	});





	return router;
};