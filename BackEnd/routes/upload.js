const { Router } = require("express");
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require("../middlewares/validar-jwt");
const { fileUpload, returnImage } = require("../controllers/upload");
const { getDocuments, deleteDocument } = require("../controllers/documents");

const router = Router();

router.use(expressFileUpload());

//Establecer imagen de usuario
router.put('/:tipo/:id', validarJWT, fileUpload);
//Obtener imagen de usuario
router.get('/:tipo/:imagen', returnImage);

//Obtener documentos
router.get('/getDocuments', getDocuments);

//Crear documentos
router.post('/:tipo', validarJWT, fileUpload);

//Eliminar documento
router.delete("/:tipo/:id", deleteDocument);



module.exports = router;