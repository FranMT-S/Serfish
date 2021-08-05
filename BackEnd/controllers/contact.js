const { request, response } = require("express")
const { sendThanks, sendContact } = require("../helpers/sendEmail");

const sendInfo = async(req = request, res = response) => {
    //console.log(req.body);
    try {
        //console.log(
        const { nombre, email, organizacion, mensaje } = req.body;

        //Luego enviamos un correo electronico 
        await sendThanks(nombre, email, organizacion);
        await sendContact(nombre, email, organizacion, mensaje);
        res.status(200).json({
            ok: true,
            msg: "El correo se ha enviado con exito."
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "El correo no se pudo enviar. Por favor contáctese con el administrador."
        });
    }
};

module.exports = {
    sendInfo
};