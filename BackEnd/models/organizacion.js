// const mongoose = require("mongoose");
// mongoose.Schema()
const { Schema, model } = require("mongoose");

// Esto es un "tabla de organizaciones"
const OrganizacionSchema = Schema({
    name: {
        type: String,
        required: true
    },
    rtn: {
        type: String,
        required: true,
        unique: true
    },
    plan: {
        type: String,
        required: true,
    },
    estado: {
        type: Boolean,
        required: true,
        default: true,
    },
    createdOn: {
        type: Number,
        default: Date.now()
    },

}, { collection: 'Organizaciones' });

OrganizacionSchema.method("toJSON", function() {
    const { __v, ...object } = this.toObject();
    return object;
});

// Implementacion del modelo
// Creamos un modelo llamado Usuario que tendra la estructura del OrganizacionSchema
module.exports = model("Organizacion", OrganizacionSchema);