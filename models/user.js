var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    documento: {
        type: String,
        required: true,
        trim: true
    },
    sexo: {
        type: Number,
        required: true
    },
    voto: {
        type: Boolean,
        required: true,
        default: false
    }

});
/*
 ** Metodos de extension para UserSchema
 */
UserSchema.statics.authenticate = function(dni, callback) {
    User.findOne({ dni }).exec(
        function(err, user) {
            if (err) {
                return callback(err);
            }
            return callback(null, user);
        }
    );
};
/*
UserSchema.statics.authenticate = function(dni, callback) {
    User.findOne({dni}).exec(
        function(err, user){
            if (err) {
                return callback(err);
            }else{
                return callback(null, user);
            }
        }
    );
 };*/
/*
// Capturar el evento de guardado y encriptar la clave...
UserSchema.pre("save", function(next){
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});
*/
var User = mongoose.model("User", UserSchema);

module.exports = User;