var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/', function(req, res, next) {

    var userData = {
        documento: req.body.dni,
        nombre: req.body.name,
        apellido: req.body.lastname,
        sexo: parseInt(req.body.sex)
    }

    User.authenticate(userData.documento, function(err, user) {
        console.log('DNI: ', userData.documento);
        if (err) {
            return next(err);
        }
        if (!user) {
            User.create(userData, function(err, user) {
                if (err) {
                    console.log('entro en en el error: ', err);
                    return next(err);
                } else {
                    req.session.userId = user._id;
                    return res.redirect("/votacion");
                }
            });
        } else {
            req.session.userId = user._id;

            if (user.voto) {
                return res.render("stop", { title: 'Ya voto' });
            } else {
                User.actualizaEstado(req.session.userId, function(err) {
                    console.log(err);
                    return res.redirect("/");
                });
                return res.redirect("/votacion");
            }
        }
    });
});

module.exports = router;