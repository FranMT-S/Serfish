const path = require('path');
const fs = require('fs');

const { request, response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImg } = require("../helpers/update-file");
const Documento = require('../models/documento');

const fileUpload = async(req = request, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id || req.uid;

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

    //procesar el archivo
    const file = req.files.imagen; // ! files.imagen contiene el archivo enviado
    const nombreCortado = file.name.split('.')
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'pdf', 'xlsx', 'xls', 'pptx', 'ppt', 'docx', 'doc', 'txt']; // TODO agregar las demas extensiones necesarias

    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }
    //Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    //path para guardar el archivo
    const path = `./upload/${ tipo }/${ nombreArchivo }`;
    //Mover el archivo
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover el archivo'
            })
        }
    });
    //Actualizar base de datos
    if (tipo == 'usuarios') {
        updateImg(tipo, id, nombreArchivo);
    }
    if (tipo == 'documentos') {
        let data = {};
        data.file = nombreArchivo;
        data.name = file.name;
        data.ownerDocument = id;
        try {
            const documento = new Documento(data);
            await documento.save();

            res.status(200).json({
                ok: true,
                msg: 'Archivo subido',
                nombreArchivo
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: "El archivo no se subio."
            });
        }
    }
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