const { Schema, model } = require("mongoose");

// Esto es un "tabla de usuario"
const EncuestaSchema = Schema({
    fecha: {
        type: Date,
        required: true
    },
    comunidad: {
        type: String,
        required: true,
    },
    empleado: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

EncuestaSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// Implementacion del modelo
// Creamos un modelo llamado Usuario que tendra la estructura del UsuarioSchema
module.exports = model("Encuesta", EncuestaSchema);