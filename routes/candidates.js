var express = require('express');
var router = express.Router();
var Candidate = require('../models/candidate');

router.get('/', function(req, res, next) {
    console.log('entra get');
    Candidate.find({},
        function(err, candidates) {
            console.log('entra function');
            if (err) return res.status(500).send(error);

            var userData = {
                nombre: req.body.name,
                apellido: req.body.lastName,
                partido: req.body.partido,
                sexo: req.body.sex
            }
            Candidate.create(userData, function(err, user) {
                if (err) {
                    console.log('entro en en el error: ', err);
                    return next(err);
                } else {
                    req.session.userId = user._id;
                    console.log('creo');
                    return res.redirect("/candidatos");
                }
            });

            res.status(200).render(
                'candidate', {
                    candidates: candidates
                }
            );
        }
    );
});

router.post('/', function(req, res, next) {
    console.log('entra post');
    Candidate.find({},
        function(err, candidates) {
            console.log('entra function');
            if (err) return res.status(500).send(error);

            var userData = {
                nombre: req.body.name,
                apellido: req.body.lastName,
                partido: req.body.partido,
                sexo: req.body.sex
            }

            console.log('userData: ', userData);

            Candidate.create(userData, function(err, user) {
                if (err) {
                    console.log('entro en en el error: ', err);
                    return next(err);
                } else {
                    req.session.userId = user._id;
                    console.log('creo');
                    return res.redirect("/candidatos");
                }
            });

        }
    );
});


module.exports = router;