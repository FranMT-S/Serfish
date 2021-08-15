const { request, response } = require("express")
const { model } = require("mongoose")
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
                                    path:"empleado",
                                    model:"Usuario",
                                    select:"name role",
                                    match:{name:"Encuestador1"},
                                    populate:{
                                        path:"organizacion",
                                        model:"Organizacion",
                                        select:"name"
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


module.exports = {
    getSurvey
}