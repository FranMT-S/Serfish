/*
    Ruta: /api/usuarios 
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { test, getUsers, newUser, updateData, deleteUser, updatePassword, changeStateUser } = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/test", test);

//TODO
//Poner middleware de validaJWT
router.get("/", validarJWT, getUsers);
// router.get("/getUser", validarJWT, getUser);

router.post("/changeState", changeStateUser);

router.post("/", [
        validarJWT,
        check("name", "El nombre es obligatorio.").not().isEmpty(),
        check("password", "La contraseña es obligatorio.").not().isEmpty(),
        check("email", "El email no es valido.").isEmail(),
        check("role", "El rol es obligatorio.").not().isEmpty(),
        validarCampos
    ],
    newUser);

router.put("/updateUser", [
        validarJWT,
        check("name", "El nombre es obligatorio.").not().isEmpty(),
        check("email", "El email no es valido.").isEmail(),
        validarCampos
    ],
    updateData);

router.put("/updatePassword", [
        check("oldPassword", "La contraseña es un campo requerido.").notEmpty(),
        check("newPassword", "La contraseña es un campo requerido.").notEmpty()
    ],
    validarCampos,
    validarJWT,
    updatePassword);

router.delete("/:id", validarJWT, deleteUser);


module.exports = router;