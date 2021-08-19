/*
    Ruta: /api/survey
*/

const { Router } = require("express");
const { getSurvey, getDataActivityMonth, getLabelActivityMonth, getDataActivityYear } = require("../controllers/encuestas")
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

router.get("/all", validarJWT, getSurvey)
router.get("/data-activity-month", validarJWT, getDataActivityMonth)
router.get("/data-activity-year", validarJWT, getDataActivityYear)
router.get("/label-activity-month", validarJWT, getLabelActivityMonth)

// router.put("/:id", validarJWT, updateMarker)

// router.delete("/:id", validarJWT, deleteMarker)

module.exports = router;