const { Schema, model } = require("mongoose");

// Esto es un "tabla de usuario"
const DocumentoSchema = Schema({
    file: { // * Este nombre es con el que se guarda
        type: String,
        required: true
    },
    name: { // * Este nombre es el que se muestra a los usuarios
        type: String
    },
    uploadDate: {
        type: String,
        default: Date.now()
    },
    ownerDocument: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

DocumentoSchema.method("toJSON", function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model("Documento", DocumentoSchema);