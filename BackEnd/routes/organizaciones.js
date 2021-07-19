/**
    Ruta: /api/organizaciones
 */

const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getOrganizaciones,
    createOrganizacion,
    updateOrganizacion,
    deleteOrganizacion
} = require("../controllers/organizaciones");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();


router.get("/", validarJWT, getOrganizaciones);

router.post("/", [
        validarJWT,
        check('name', 'El nombre es necesario.').not().isEmpty(),
        check('rtn', 'El rtn es necesario.').not().isEmpty(),
        check('plan', 'El plan es necesario.').not().isEmpty(),
        validarCampos
    ],
    createOrganizacion);

router.put("/updateOrganizacion", [
        validarJWT,
        check('name', 'El nombre es necesario.').not().isEmpty(),
        check('rtn', 'El rtn es necesario.').not().isEmpty(),
        check('plan', 'El plan es necesario.').not().isEmpty(),
        validarCampos
    ],
    updateOrganizacion);

router.delete("/:id", validarJWT, deleteOrganizacion);


module.exports = router;