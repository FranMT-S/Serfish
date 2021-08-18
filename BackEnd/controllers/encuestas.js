const { request, response } = require("express")
const Encuesta = require("../models/encuesta")
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

const getSurvey = async (req = request, res = response) => {
    const { uid } = req
    try {
        const { organizacion } = await Usuario.findById(uid);
        if (!organizacion) {
            return res.status(400).json({
                ok: false,
                msg: "La organizacion no esta registrada."
            })
        }
        const encuestas = await Encuesta.find()
            .populate({
                path: "empleado",
                model: "Usuario",
                select: "name role",
                populate: {
                    path: "organizacion",
                    model: "Organizacion",
                    select: "name"
                }
            });
        return res.status(200).json({
            ok: true,
            encuestas
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
}

const getDataActivityMonth = async (req = request, res = response) => {
    const { uid } = req
    const nombreCientifico = req.header('nombreCientifico');
    try {
        const dataActivityMonth = await Encuesta.aggregate([
            {
                //INNER JOIN CON DATOS BIOLOGICO
                $lookup: {
                    from: "datosbiologicos",
                    localField: "_id",
                    foreignField: "encuesta",
                    as: "registro"
                }
            },
            {
                //DESESTRUCTURACION DEL ARREGLO A OBJETOS INDIVIDUALES
                $unwind: "$registro"
            },
            {
                //PROYECCION DE LOS CAMPOS DESEADOS
                $project: {
                    fecha: "$fecha",
                    year: { $year: "$fecha" },
                    month: { $month: "$fecha" },
                    nombreComun: "$registro.nombreComun",
                    nombreCientifico: "$registro.nombreCientifico"
                }
            },
            {
                //WHERE SOLO LOS NOMBRES DE COINCIDA
                $match: { nombreCientifico }
            },
            {
                //GROUP EN BASE DE LOS NOMBRE Y FECHAS
                //CONTADOR DE ESAS AGRUPACIONES
                $group: { _id: { nombreCientifico: "$nombreCientifico", nombreComun: "$nombreComun", anio: "$year", mes: "$month" }, count: { $sum: 1 } }
            },
            {
                //PROYECCION DE LOS CAMPOS DESEADOS
                $project: {
                    _id: 0,
                    year: "$_id.anio",
                    month: "$_id.mes",
                    nombreComun: "$_id.nombreComun",
                    nombreCientifico: "$_id.nombreCientifico",
                    cantidad: "$count"
                }
            },
            {
                $sort: { year: 1, month: 1 }
            }
        ])
        return res.status(200).json({
            ok: true,
            dataActivityMonth
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
}

const getLabelActivityMonth = async (req = request, res = response) => {
    const { uid } = req
    try {
        const labelDate = await Encuesta.aggregate([
            {
                $group: { _id: { year: { $year: "$fecha" }, month: { $month: "$fecha" } } }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month"
                }
            },
            {
                $sort: { year: 1, month: 1 }
            }
        ])
        return res.status(200).json({
            ok: true,
            labelDate
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
    getSurvey,
    getDataActivityMonth,
    getLabelActivityMonth
}