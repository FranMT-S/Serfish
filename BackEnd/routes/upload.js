const { Router } = require("express");
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require("../middlewares/validar-jwt");
const { fileUpload, returnFile } = require("../controllers/upload");
const { getDocuments, deleteDocument } = require("../controllers/documents");

const router = Router();

router.use(expressFileUpload());

//Establecer imagen de usuario
router.put('/:tipo/:id', validarJWT, fileUpload);
//Obtener imagen de usuario
router.get('/:tipo/:imagen', returnFile);

//Obtener documentos
router.get('/getDocuments', validarJWT, getDocuments);

//Crear documentos
router.post('/:tipo', validarJWT, fileUpload);

//Eliminar documento
router.delete("/:tipo/:id", validarJWT, deleteDocument);



module.exports = router;