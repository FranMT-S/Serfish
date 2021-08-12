const path = require('path');
const fs = require('fs');

const { request, response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImg } = require("../helpers/update-file");
const Documento = require('../models/documento');
const Usuario = require("../models/usuario");

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
    const file = req.files.imagen || req.files.archivo; // ! files.imagen contiene el archivo enviado
    const nombreCortado = file.name.split('.')
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar extension
    const extensionesValidasImagen = ['png', 'jpg', 'jpeg', 'gif'];
    const extensionesValidasArchivo = ['pdf', 'xlsx', 'xls', 'pptx', 'ppt', 'docx', 'doc']; // TODO agregar las demas extensiones necesarias


    if (tipo === "usuarios" && (!extensionesValidasImagen.includes(extensionArchivo))) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida para la imagen'
        });
    }
    if (tipo === "documentos" && (!extensionesValidasArchivo.includes(extensionArchivo))) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida para el archivo'
        });
    }
    //Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    //path para guardar el archivo
    // crear directorio si no existe
    const filePath = `./upload/${ tipo }`;
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
    }
    const path = `./upload/${ tipo }/${ nombreArchivo }`;
    //Mover el archivo
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover el archivo'
            });
        }
    });
    //Actualizar base de datos
    if (tipo == 'usuarios') {
        updateImg(tipo, id, nombreArchivo);
    }
    if (tipo == 'documentos') {
        // obtener id de organizacion del usuario
        const { organizacion } = await Usuario.findById(req.uid);
        let data = {};
        data.organizacion = req.body.organizacion || String(organizacion);
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

const returnFile = (req, res) => {

    const tipo = req.params.tipo;
    const imagen = req.params.imagen;


    let pathImg = path.join(__dirname, `../upload/${tipo}/${ imagen }`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        if (tipo === "usuarios") {
            pathImg = path.join(__dirname, `../upload/no-image.png`);
            res.sendFile(pathImg);
        } else if (tipo === "documentos") {
            // pathImg = path.join(__dirname, `../upload/no-image.png`);
            res.status(504).json({
                ok: false,
                msg: "El archivo no existe."
            });
        } else {
            res.status(504).json({
                ok: false,
                msg: "Ocurrio un error al cargar el archivo. Verifique que esta crgando el archivo con el formato indicado."
            });
        }
    }

}

module.exports = {
    fileUpload,
    returnFile
}