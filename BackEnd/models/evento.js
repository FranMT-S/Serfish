const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }

});

EventoSchema.method("toJSON", function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model("Evento", EventoSchema);