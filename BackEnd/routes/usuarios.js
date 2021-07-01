/*
    Ruta: /api/usuarios 
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { test, getUser, newUser, updateData, deleteUser, filterUse } = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/test", test);

//TODO
//Poner middleware de validaJWT
router.get("/", getUser);

router.post("/",
            [
                check("name", "El nombre es obligatorio.").not().isEmpty(),
                check("password", "La contrasaña es obligatorio.").not().isEmpty(),
                check("email", "El email no es valido.").isEmail(),
                check("role", "El rol es obligatorio.").not().isEmpty(),
                validarCampos
            ],
            newUser);

router.put("/:id",
            [
                validarJWT,
                check("name", "El nombre es obligatorio.").not().isEmpty(),
                check("email", "El email no es valido.").isEmail(),
                check("role", "El role es obligatorio.").not().isEmpty(),
                validarCampos
            ],
            updateData);

router.delete("/:id", validarJWT, deleteUser);

module.exports = router;