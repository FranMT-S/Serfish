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


const getBiologyDataAll = async (req = request, res = response) => {
    const { uid } = req
    try {
        const { organizacion } = await Usuario.findById(uid);
        if (!organizacion) {
            return res.status(400).json({
                ok: false,
                msg: "La organizacion no esta registrada."
            })
        }
        const biologyDataAll = await DatosBiologico.aggregate([
            {
                $lookup: {
                    from: "encuestas",
                    localField: "encuesta",
                    foreignField: "_id",
                    as: "encuesta"
                }
            },
            {
                $lookup: {
                    from: "usuarios",
                    localField: "encuesta.empleado",
                    foreignField: "_id",
                    as: "empleado"
                }
            },
            { $match: { "empleado.organizacion": { $eq: organizacion } } },
        ]);
        return res.status(200).json({
            ok: true,
            biologyDataAll
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
}


const getForkLengthAndIndividuals = async (req = request, res = response) => {
    const { uid } = req
    const nombreCientifico = req.header('nombreCientifico');
    try {
        const { organizacion } = await Usuario.findById(uid);
        if (!organizacion) {
            return res.status(400).json({
                ok: false,
                msg: "La organizacion no esta registrada."
            })
        }
        const forkLengthAndIndividuals = await DatosBiologico.aggregate([
            {
                $lookup: {
                    from: "encuestas",
                    localField: "encuesta",
                    foreignField: "_id",
                    as: "encuesta"
                }
            },
            {
                $lookup: {
                    from: "usuarios",
                    localField: "encuesta.empleado",
                    foreignField: "_id",
                    as: "empleado"
                }
            },
            {
                $project: {
                    _id: 0,
                    organizacion: { $first: "$empleado.organizacion" },
                    nombreCientifico: "$nombreCientifico",
                    longitudHorquilla: "$longitudHorquilla"
                }
            },
            { $match: { nombreCientifico, organizacion } },
            { $group: { _id: "$longitudHorquilla", count: { $sum: 1 } } },
            { $sort: { _id: 1 } },
            {
                $project: {
                    _id: 0,
                    length: "$_id",
                    currentTotal: "$count"
                }
            }
        ]);
        return res.status(200).json({
            ok: true,
            forkLengthAndIndividuals
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
}



const getCommonScientificName = async (req = request, res = response) => {
    const { uid } = req
    try {
        const { organizacion } = await Usuario.findById(uid);
        if (!organizacion) {
            return res.status(400).json({
                ok: false,
                msg: "La organizacion no esta registrada."
            })
        }
        const fishNames = await DatosBiologico.aggregate([
            {
                $lookup: {
                    from: "encuestas",
                    localField: "encuesta",
                    foreignField: "_id",
                    as: "encuesta"
                }
            },
            {
                $lookup: {
                    from: "usuarios",
                    localField: "encuesta.empleado",
                    foreignField: "_id",
                    as: "empleado"
                }
            },
            {
                $project: {
                    _id: 0,
                    organizacion: { $first: "$empleado.organizacion" },
                    nombreComun: "$nombreComun",
                    nombreCientifico: "$nombreCientifico"
                }
            },
            { $match: { organizacion } },
            { $group: { _id: { nombreCientifico: "$nombreCientifico", nombreComun: "$nombreComun" } } },
            { $sort: { _id: 1 } },
            {
                $project: {
                    _id: 0,
                    commonName: "$_id.nombreComun",
                    scientificName: "$_id.nombreCientifico",
                }
            }
        ]);
        return res.status(200).json({
            ok: true,
            fishNames
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
    getBiologyDataAll,
    getForkLengthAndIndividuals,
    getCommonScientificName
}