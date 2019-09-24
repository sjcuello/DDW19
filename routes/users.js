var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* POST para nuevo usuario o login...*/
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
        console.log('User recuperado: ', user);
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
                console.log('El usuario ya voto');
                return res.render("stop", { title: 'Ya voto' });
            } else {
                User.actualizaEstado(req.session.userId, function(err) {
                    console.log('Error:', err);
                    return res.redirect("/");
                });
                console.log('Actualizooo!');
                return res.redirect("/votacion");
            }
        }
        //req.session.userId = user._id;
        //return res.redirect("/");

    });
});

module.exports = router;