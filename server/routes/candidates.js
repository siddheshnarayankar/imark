'use strict';

var router = require('express').Router();
const path = require('path');
var multer = require('multer');
let fs = require('fs-extra');

const DIR = './uploads';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null,  file.originalname );
        let type = file.originalname.split('.');
        let dirName = type[0] + type[1];
        let path = `./uploads/${dirName}`;
        let fss = fs.mkdirsSync(path);
        cb(null, path);
    },
    filename: (req, file, cb) => {
        let type = file.originalname.split('.');
        cb(null, file.fieldname + '-' + type[2] + '.png');
    }
});
let upload = multer({ storage: storage });


exports = module.exports = function (app) {

    router.post('/test', upload.single('photo'), function (req, res) {
        var path = '';
        // console.log(req.body);
        if (!req.file) {
            console.log("No file received");
            return res.send({
                success: false
            });

        } else {
            console.log('file received');
            return res.send({
                success: true
            })
        }

    });
    router.get('/:id', function (req, res, next) {
        app.models.Candidate.find({ cand_org_id: req.params.id })
            .exec(function (err, candidate) {
                if (err) next(err);

                res.status(200)
                    .json(candidate || []);
            });
    });


    router.post('/', function (req, res, next) {
        var data = {
            cand_name: req.body.cand_name,
            cand_age: req.body.cand_age,
            cand_org_id: req.body.cand_org_id,
            cand_image_fold:req.body.cand_image_fold,
            cand_image_name:req.body.cand_image_name
        }

        console.log(data);

        app.models.Candidate.create(data, function (err, candidate) {
            if (err) next(err);

            res.status(200).json({
                candidate: candidate,
                message: 'Candidate has been added successfully.'
            })
        });
    });

    return router;
}
