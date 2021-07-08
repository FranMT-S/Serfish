/*
    Ruta: /api/login 
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { login, revalidarToken, forgotPassword, newPassword } = require("../controllers/login");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
router.get("/renew", validarJWT, revalidarToken);
router.post("/", [
        check("email", "El correo es invalido, o verifique que el campo no este vacío.").isEmail(),
        check("password", "La contraseña es obligatorio.").not().isEmpty(),
        validarCampos
    ],
    login);

router.get("/forgot-password", forgotPassword);
router.put("/new-password/:token", [
        check("newPassword", "La contraseña es un campo requerido.").notEmpty()
    ],
    validarCampos,
    validarJWT,
    newPassword);


module.exports = router;