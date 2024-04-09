const { request, response } = require("express")
const { generarJWT } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { sendEmail } = require("../helpers/sendEmail");

const login = async(req = request, res = response) => {

    const { email, password } = req.body;
    try {
        // Validar email.
        const userExist = await Usuario.findOne({ email });
        if (!userExist) {
            return res.status(404).json({
                ok: false,
                msg: "El email es inválido."
            });
        }
        // Validar password
        const passMatch = bcrypt.compareSync(password, userExist.password); //Retorna un bool, si hace match true, de lo contrario false
        if (!passMatch) {
            return res.status(400).json({
                ok: false,
                msg: "La contraseña es incorrecta."
            });
        }
        // Generacion de JWT
        const token = await generarJWT(userExist.id);
        const { __v, _id, organizacion, google, ...data } = userExist._doc;
        delete data['password']; // eliminar password del objeto que se envia
        data.uid = _id;
        res.status(200).json({
            ok: true,
            data,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
};

const revalidarToken = async(req = request, res = response) => {

    //obtener uid
    const { uid } = req;

    //renovar nuevo JWT
    const token = await generarJWT(uid);

    //obtener información
    const userExist = await Usuario.findById(uid);
    const { __v, _id, organizacion, google, ...data } = userExist._doc;
    delete data['password'];
    data.uid = _id;
    return res.status(200).json({
        ok: true,
        data,
        token
    });
};

const forgotPassword = async(req = request, res = response) => {
    //Email enviado?
    const { email } = req.headers;
    if (!email) {
        return res.status(400).json({
            ok: false,
            msg: "El email no se ha recibido correctamente."
        });
    }

    try {
        //Verificar que el email este en nuesta BD.
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "No existe ningún usuario registrado con este correo electrónico."
            });
        }

        //Si el correo se envio y existe en la BD generamos un JWT.
        const token = await generarJWT(user._id, '600s');

        //Luego enviamos un correo electronico al usuario que solicita el cambio de contraseña.
        let url = `${req.protocol + '://' + req.get('host')}` 
        let info = await sendEmail(user.name, email, token,url);
        console.log("Salido de send")
        res.status(200).json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
};

const newPassword = async(req = request, res = response) => {
    const uid = req.uid;
    let { newPassword } = req.body;
    try {
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync(); //data generada de manera aletoria.
        newPassword = bcrypt.hashSync(newPassword, salt);

        //Buscar y actualizar usuario
        const user = await Usuario.findByIdAndUpdate(uid, { password: newPassword });
        res.status(200).json({
            ok: true,
            msg: "La contraseña se a actualizado correctamente."

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
};

module.exports = {
    login,
    revalidarToken,
    forgotPassword,
    newPassword
};