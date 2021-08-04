const { request, response } = require("express")
const Marker = require("../models/marker")
const Usuario = require("../models/usuario")

const newMarker = async (req = request, res = response) => {
    const { uid } = req
    try {
        const { organizacion } = await Usuario.findById(uid)
        if (!organizacion) {
            return res.status(400).json({
                ok: false,
                msg: "La organizacion no esta registrada."
            })
        }
        req.body['organizacion'] = organizacion;
        const newMarker = new Marker(req.body)
        await newMarker.save();
        return res.status(200).json({
            ok: true,
            msg: "Direccion creada con exito.",
            marker: newMarker
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
}

const getMarkers = async (req = request, res = response) => {
    const { uid } = req
    try {
        const { organizacion } = await Usuario.findById(uid);
        if (!organizacion) {
            return res.status(400).json({
                ok: false,
                msg: "La organizacion no esta registrada."
            })
        }
        const markers = await Marker.find({ organizacion });
        return res.status(200).json({
            ok: true,
            markers
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
}

const updateMarker = async (req = request, res = response) => {
    const { id } = req.params
    console.log(req.body)
    try {
        const marker = await Marker.findById(id);
        if (!marker) {
            return res.status(400).json({
                ok: false,
                msg: `No existe ningun marcador con el id ${id}`
            })
        }
        const updateMarker = await Marker.findByIdAndUpdate(id, req.body, { new: true })
        return res.status(200).json({
            ok: true,
            marker: updateMarker
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
}

const deleteMarker = async (req = request, res = response) => {
    const { id } = req.params
    try {
        const marker = await Marker.findByIdAndDelete(id)
        if (!marker) {
            return res.status(400).json({
                ok: false,
                msg: "El marcador ya fue eliminado o no esta registrado."
            })
        }
        return res.status(200).json({
            ok: true,
            msg: "Marcador eliminado de forma exitosa.",
            marker
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
}

module.exports = {
    newMarker,
    getMarkers,
    updateMarker,
    deleteMarker
}