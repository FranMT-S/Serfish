    const { response, request } = require("express");
    const { validationResult } = require("express-validator");

    const validarCampos = (req=request, res=response, next)=>{
        const errores = validationResult(req); // resultado de la check
        // console.log(errores);
        if(!errores.isEmpty()){
            return res.status(400).json({
                ok:false,
                errores:errores.mapped(),
                msg:"Uno de los campos no fue ingresado correctamente."
            });
        }
        next();
    }

    module.exports = {
        validarCampos
    }