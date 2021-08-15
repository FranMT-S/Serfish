/*
    Ruta: /api/datos-biologicos
*/


const { Router } = require("express");
const { getBiologyData } = require("../controllers/datos-biologicos")
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

router.get("/", validarJWT, getBiologyData)

// router.put("/:id", validarJWT, updateMarker)

// router.delete("/:id", validarJWT, deleteMarker)

module.exports = router;