// const mongoose = require("mongoose");
// mongoose.Schema()
const { Schema, model } = require("mongoose");

// Esto es un "tabla de usuario"
const UsuarioSchema = Schema({
    name:{
        type    : String,
        required : true
    },
    email:{
        type    : String,
        required: true,
        unique  : true
    },
    password:{
        type    : String,
        required: true,
    },
    img:{
        type    : String
    },
    role:{
        type    : String,
        required : true,
        default : "USER_ROLE"
    },
    google:{
        type    : Boolean,
        default : false
    },    
    state:{
        type    : Boolean,
        default : false
    }
});

UsuarioSchema.method("toJSON", function(){
    const {__v, _id, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

// Implementacion del modelo
// Creamos un modelo llamado Usuario que tendra la estructura del UsuarioSchema
module.exports = model( "Usuario", UsuarioSchema);