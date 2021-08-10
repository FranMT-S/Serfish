const { response } = require('express');
const Evento = require('../models/evento');
const Usuario = require("../models/usuario");

const createEvent = async(req = request, res = response) => {
    try {

        const { organizacion } = await Usuario.findById(req.uid);
        let data = req.body;
        data.organizacion = organizacion;
        const event = new Evento(data);

        await event.save();

        res.status(200).json({
            ok: true,
            event
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contactese con el administrador.'
        });
    }

};

const getEvents = async(req = request, res = response) => {
    const eventId = req.header('eventId') || false;
    try {
        if (eventId) {
            const evento = await Evento.findById(eventId);
            const events = [evento]
            res.status(200).json({
                ok: true,
                events
            });
        } else {
            const { organizacion } = await Usuario.findById(req.uid);
            const events = await Evento.find({ organizacion });
            res.status(200).json({
                ok: true,
                events
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
};

const updateEvent = async(req = request, res = response) => {

    const id = req.params.id;

    try {
        const event = await Evento.findById(id);

        const eventExist = await Evento.findById(event.id);
        if (!eventExist) {
            return res.status(404).json({
                ok: false,
                msg: "El evento no se encuentra en la BD."
            });
        }
        const changeEvent = {
            ...req.body
        }

        const updateEvent = await Evento.findByIdAndUpdate(id, changeEvent, { new: true })
        return res.status(200).json({
            ok: true,
            event: updateEvent
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }

};

const deleteEvent = async(req = request, res = response) => {

    const eventId = req.params.id;

    try {
        const eventExists = await Evento.findById(eventId);
        if (!eventExists) {
            return res.status(200).json({
                ok: false,
                msg: "El evento no existe."
            });
        }
        await Evento.findByIdAndDelete(eventId);
        res.status(200).json({
            ok: true,
            msg: "El evento se ha eliminado correctamente."
        });

    } catch (error) {

        response.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
};
module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent

}