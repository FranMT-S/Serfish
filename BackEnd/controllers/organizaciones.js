const { request, response } = require("express");
const Organizacion = require("../models/organizacion");
const User = require("../models/usuario");

const getOrganizaciones = async(req = request, res = response) => {

    try {
        const organizaciones = await Organizacion.find();
        res.json({
            ok: true,
            organizaciones
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
};

const createOrganizacion = async(req = request, res = response) => {

    const { name, rtn } = req.body;

    try {

        // verificar que no exista el nombre ni el rtn 
        const nameExist = await Organizacion.findOne({ name });
        //console.log(nameExist);
        if (nameExist) {
            return res.status(400).json({
                ok: false,
                msg: "El nombre ingresado ya esta siendo utilizado."
            });
        }
        const rtnExist = await Organizacion.findOne({ rtn });
        //console.log(rtnExist);
        if (rtnExist) {
            return res.status(400).json({
                ok: false,
                msg: "El rtn ingresado ya esta siendo utilizado."
            });
        }

        // Si pasa la verificación se crea la nueva organización
        const organizacion = new Organizacion(req.body);

        // crear organización
        await organizacion.save();

        res.json({
            ok: true,
            organizacion
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contactese con el administrador.'
        });
    }

};
const updateOrganizacion = async(req = request, res = response) => {

    const { name, rtn, plan } = req.body;

    try {
        const user = await User.findById(req.uid);

        //Verificar que la organizacion este registrada
        const orgRegister = await Organizacion.findById(user.organizacion);
        if (!orgRegister) {
            return res.status(404).json({
                ok: false,
                msg: "El id de la organización no se encuentra en la BD."
            });
        }
        // const organizacionUpdate = await Organizacion.findByIdAndUpdate(user.organizacion, { name, rtn, plan }, { new: true });
        const nameNotExists = await Organizacion.findOne({ name }); //retorna null si no existe, de lo contrario la considencia.
        const rtnNotExists = await Organizacion.findOne({ rtn }); //retorna null si no existe, de lo contrario la considencia.
        if (nameNotExists && (name !== orgRegister.name)) {
            return res.status(404).json({
                ok: true,
                msg: "El nombre ya esta siendo utilizado por otra organización."
            });
        }
        if (rtnNotExists && (rtn !== orgRegister.rtn)) {
            return res.status(404).json({
                ok: true,
                msg: "El rtn ya esta siendo utilizado por otra organización."
            });
        }
        if (plan === orgRegister.plan) {
            const organizacionUpdate = await Organizacion.findByIdAndUpdate(user.organizacion, { name, rtn }, { new: true });
            return res.status(200).json({
                ok: true,
                organizacionUpdate
            });
        } else if (plan !== orgRegister.plan) {
            const organizacionUpdate = await Organizacion.findByIdAndUpdate(user.organizacion, { name, rtn, plan }, { new: true });
            return res.status(200).json({
                ok: true,
                organizacionUpdate
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contactese con el administrador.'
        });
    }
};
const deleteOrganizacion = async(req = request, res = response) => {
    const orgId = req.params.id;
    try {
        const orgExists = await Organizacion.findById(orgId);
        if (!orgExists) {
            return res.status(200).json({
                ok: false,
                msg: "El id de la organización no existe."
            });
        }
        await Organizacion.findByIdAndDelete(orgId);
        res.status(200).json({
            ok: true,
            msg: "La organización se ha eliminado correctamente."
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
};

module.exports = {
    getOrganizaciones,
    createOrganizacion,
    updateOrganizacion,
    deleteOrganizacion
};