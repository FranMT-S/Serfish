/*
    Ruta: /api/encuestas
*/


const { Router } = require("express");
const { getSurvey } = require("../controllers/encuestas")
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// router.post("/", [
//     check("color", "El color es un campo obligatorio").notEmpty(),
//     check("lnglat", "La longitud y latitud son campos obligatorios").notEmpty()
// ],
//     validarCampos,
//     validarJWT,
//     newMarker);

router.get("/", validarJWT, getSurvey)

// router.put("/:id", validarJWT, updateMarker)

// router.delete("/:id", validarJWT, deleteMarker)

module.exports = router;