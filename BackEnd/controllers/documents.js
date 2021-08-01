const { response } = require('express');
const Documento = require('../models/documento');
const fs = require('fs');

const getDocuments = async(req, res = response) => {

    try {
        const documents = await Documento.find();
        res.status(200).json({
            ok: true,
            documents
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
}

const deleteDocument = async(req = request, res = response) => {

    const tipo = req.params.tipo;
    const docId = req.params.id;

    try {
        const docExists = await Documento.findById(docId);
        if (!docExists) {
            return res.status(200).json({
                ok: false,
                msg: "El id del documento no existe."
            });
        }
        await Documento.findByIdAndDelete(docId);
        fs.unlinkSync(`./upload/${ tipo }/${ docExists.file }`)
        res.status(200).json({
            ok: true,
            msg: "El documento se ha eliminado correctamente."
        });

    } catch (error) {

        response.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
};


module.exports = {
    getDocuments,
    deleteDocument
}