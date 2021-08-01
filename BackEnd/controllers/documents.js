const { response } = require('express');
const Documento = require('../models/documento')

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

const loadDocument = async(req, res = response) => {

    const { name, uploadDate, file, ownerDocument } = req.body;
    const document = new Documento(req.body);

    await document.save();

    try {
        res.status(200).json({
            ok: true,
            document
        });

    } catch (error) {
        res.json.status(500).json({
            ok: false,
            msg: 'Contactese con el administrador.'
        });
    }

}

const deleteDocument = async(req = request, res = response) => {

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
    loadDocument,
    deleteDocument
}