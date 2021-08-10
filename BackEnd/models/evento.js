const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    organizacion: {
        type: Schema.Types.ObjectId,
        ref: 'Organizacion',
        required: true
    }
});

EventoSchema.method("toJSON", function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model("Evento", EventoSchema);