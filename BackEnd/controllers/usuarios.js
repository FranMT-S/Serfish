const { request, response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const usuario = require("../models/usuario");

const test = (req = request, res = response) => {
    res.status(200).json({
        ok: true,
        msg: "El test se realizo de manera exitosa!!"
    });
};

const getUsers = async(req = request, res = response) => {
    //TASK-29.
    const { skipUser, limitUser } = req.query;
    // si se le panda un parametro ?last=true solo retorna el ultimo elemento
    try {
        if (req.query.last === "false") {
            const { organizacion } = await Usuario.findById(req.uid);
            const usuarios = await Usuario.find({ organizacion }, "name email role").skip(Number(skipUser) || 0).limit(Number(limitUser) || 0);
            res.status(200).json({
                ok: true,
                usuarios
            });
        } else {
            const { organizacion } = await Usuario.findById(req.uid);
            const usuarios = await Usuario.find({ organizacion }, "name email role").sort({ _id: -1 }).limit(1);
            res.status(200).json({
                ok: true,
                usuarios
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

const getUser = async(req = request, res = response) => {
    try {
        const { _doc } = await Usuario.findById(req.query.uQuery || req.uid);
        const { _id, __v, password, ...usuario } = _doc;
        usuario.uid = _id;
        res.status(200).json({
            ok: true,
            usuario
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
};

const newUser = async(req = request, res = response) => {
    const { email, password } = req.body;
    try {
        // Paso 0: obtener la organizacion
        const { organizacion } = await Usuario.findById(req.uid);
        // Paso 1: Verificar el email
        const emailExist = await Usuario.findOne({ email });
        // console.log(emailExist);
        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: "El correo ingresado ya esta siendo utilizado."
            });
        }
        // Paso 2: Si pasa la validacion creamos una nueva instancia de usuario
        const usuario = new Usuario(req.body);
        usuario.organizacion = req.body.organizacion || organizacion;
        // Paso 3: Encryptamos la contraseña, como buena practica.
        const salt = bcrypt.genSaltSync(); //data generada de manera aletoria.
        usuario.password = bcrypt.hashSync(password, salt);

        // Paso 5: Generar JWT (Esto con el fin de disminuir las peticiones al back en caso de que la app tenga muchos usuario)
        const token = await generarJWT(usuario.id);

        // Paso 4: Guardar usuario en la base de datos.
        await usuario.save();
        res.status(200).json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }

};

const updateData = async(req = request, res = response) => {
    const uid = req.headers.uid || req.uid;
    let { name, email, role, state } = req.body;
    try {
        //Verificar que el usuario este registrado
        const userRegister = await Usuario.findById(uid);
        role = role || userRegister.role;
        if (!userRegister) {
            return res.status(404).json({
                ok: false,
                msg: "El id del usuario no se encuentra en la BD."
            });
        }
        //Verificar la existencia del correo
        if (email === userRegister.email) {
            //Actualizar los campos
            const { _doc } = await Usuario.findByIdAndUpdate(uid, { name, role, state }, { new: true });
            const { _id, __v, password, ...userUpdate } = _doc;
            userUpdate.uid = _id;
            return res.status(200).json({
                ok: true,
                userUpdate
            });
        } else {
            const emailExist = await Usuario.findOne({ email }); //retorna null si no existe, de lo contrario la considencia.
            if (!emailExist) {
                return res.status(200).json({
                    ok: true,
                    emailExist
                });
            }
            return res.status(404).json({
                ok: true,
                msg: "El correo ya es utilizado por otro usuario."
            });
        }

    } catch (error) {
        console.log("CATCH", error);
        res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
};

const updatePassword = async(req = request, res = response) => {
    const uid = req.headers.uid || req.uid;
    const { oldPassword, newPassword } = req.body;
    try {
        const userExist = await Usuario.findById(uid);
        // Validar password antigua
        const oldPassMatch = bcrypt.compareSync(oldPassword, userExist.password); //Retorna un bool, si hace match true, de lo contrario false
        if (!oldPassMatch) {
            return res.status(400).json({
                ok: false,
                msg: "La contraseña actual es incorrecta."
            });
        }
        // validar que la nueva contraseña sea distinta de la vieja
        const newPassMatch = bcrypt.compareSync(newPassword, userExist.password); //Retorna un bool, si hace match true, de lo contrario false
        if (newPassMatch) {
            return res.status(400).json({
                ok: false,
                msg: "La nueva contraseña es la misma que la vieja contraseña."
            });
        }
        // actualizar contraseña
        const salt = bcrypt.genSaltSync(); //data generada de manera aletoria.
        await Usuario.findByIdAndUpdate(uid, { password: bcrypt.hashSync(newPassword, salt) }, { new: true });

        return res.status(200).json({
            ok: true,
            msg: "La contraseña ha sido cambiada exitosamente."
        });
    } catch (error) {
        console.log("CATCH", error);
        res.status(500).json({
            ok: false,
            msg: "¡Algo salio mal! Por favor contáctese con el administrador"
        });
    }
};

const deleteUser = async(req = request, res = response) => {
    const uid = req.params.id;
    try {
        const userExist = await Usuario.findById(uid);
        if (!userExist) {
            return res.status(200).json({
                ok: false,
                msg: "El id del usuario no existe."
            });
        }
        await Usuario.findByIdAndDelete(uid);
        res.status(200).json({
            ok: true,
            msg: "El usuario se ha eliminado correctamente."
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
    test,
    getUsers,
    getUser,
    newUser: newUser,
    updateData,
    updatePassword,
    deleteUser
};






// Nota:
// Advertencia de obsolescencia: Mongoose: `findOneAndUpdate ()` y `findOneAndDelete ()` sin la opción `useFindAndModify` 
// establecida en false están en desuso. Ver: https://mongoosejs.com/docs/deprecations.html#findandmodify
// (Use `node --trace-deprecation ...` para mostrar dónde se creó la advertencia)
// collection.findAndModify está en desuso. Utilice findOneAndUpdate, findOneAndReplace o findOneAndDelete en su lugar.