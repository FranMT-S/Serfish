const { request, response } = require("express")
const DatosBiologico = require("../models/datosBiologicos")
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

const getBiologyData = async (req = request, res = response) => {
    const { uid } = req
    const nombreCientifico = req.header('nombreCientifico');
    console.log(nombreCientifico)
    try {
        // const { organizacion } = await Usuario.findById(uid);
        // if (!organizacion) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: "La organizacion no esta registrada."
        //     })
        // }
        const biologyData = await DatosBiologico.aggregate([
            { $match: { nombreCientifico } },
            { $group: { _id: "$longitudHorquilla", count: { $sum: 1 }} },
            { $sort: { _id: 1 } }
        ]);
        console.log(biologyData)
        return res.status(200).json({
            ok: true,
            biologyData
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
    getBiologyData
}