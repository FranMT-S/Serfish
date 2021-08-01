const { Router } = require("express");
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require("../middlewares/validar-jwt");
const { fileUpload, returnImage } = require("../controllers/upload");
const { getDocuments, loadDocument, deleteDocument } = require("../controllers/documents");

const router = Router();

router.use(expressFileUpload());

//Establecer imagen de usuario
router.put('/:tipo/:id', validarJWT, fileUpload);
//Obtener imagen de usuario
router.get('/:tipo/:imagen', returnImage);

//Obtener documentos
router.get('/getDocuments', getDocuments);

//Crear documentos
router.post('/document', loadDocument);
router.put('/:tipo/:id', fileUpload);

//Eliminar documento
router.delete("/:id", deleteDocument);



module.exports = router;