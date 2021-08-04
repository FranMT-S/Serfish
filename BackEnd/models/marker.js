const { Schema, model } = require("mongoose");

const MarkersSchema = Schema({
    color: {
        type: String,
        required: true
    },
    lnglat: {
        type: String,
        required: true,
    },
    organizacion: {
        type: Schema.Types.ObjectId,
        ref: 'Organizacion',
        required: true
    }
})

MarkersSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("Marker", MarkersSchema);