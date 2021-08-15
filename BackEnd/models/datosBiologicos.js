const { Schema, model } = require("mongoose");

// Esto es un "tabla de usuario"
const DatosBiologicosSchema = Schema({
    nombreComun: {
        type: String,
        required: true
    },
    nombreCientifico: {
        type: String,
        required: true,
    },
    familia: {
        type: String,
        required: true,
    },
    genero: {
        type: String,
        required: true,
    },
    especie: {
        type: String,
        required: true,
    },
    sexo: {
        type: String,
        required: true,
    },
    longitudHorquilla: {
        type: Number,
        required: true,
    },
    pesoGr: {
        type: Number,
        required: true,
    },
    encuesta: {
        type: Schema.Types.ObjectId,
        ref: 'Encuesta',
        required: true
    }
});

DatosBiologicosSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// Implementacion del modelo
// Creamos un modelo llamado Usuario que tendra la estructura del UsuarioSchema
module.exports = model("DatosBiologico", DatosBiologicosSchema);