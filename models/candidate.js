var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        partido:{
            type: String,
            required: true,
            trim: true
        },
        sexo:{
            type: Number,
            required: true
        }
    }
);

var Candidate = mongoose.model("Candidate", UserSchema);

module.exports = Candidate;