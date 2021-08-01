const { Schema, model } = require("mongoose");

// Esto es un "tabla de usuario"
const DocumentoSchema = Schema({
    name: {
        type: String,
        required: true
    },
    uploadDate: {
        type: String,
        default: Date.now("YYYY-mm-ddTHH: MM")
    },
    file: {
        type: String
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