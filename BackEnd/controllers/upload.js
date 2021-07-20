const path = require('path');
const fs = require('fs');

const { request, response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImg } = require("../helpers/update-image");

const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const validType = ['usuarios', 'documentos'];

    //Validar que exista un archivo
    if (!validType.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo archivo seleccionado no es aceptado'
        })
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    //procesar la imagen 
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.')
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }
    //Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    //path para guardar la imagen
    const path = `./upload/${ tipo }/${ nombreArchivo }`;
    //Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            })
        }
    });
    //Actualizar imagen
    updateImg(tipo, id, nombreArchivo);

    res.json({
        ok: true,
        msg: 'Archivo subido',
        nombreArchivo
    });
}

const returnImage = (req, res) => {

    const tipo = req.params.tipo;
    const imagen = req.params.imagen;


    const pathImg = path.join(__dirname, `../upload/${tipo}/${ imagen }`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../upload/no-image.png`);
        res.sendFile(pathImg);
    }



}

module.exports = {
    fileUpload,
    returnImage

}