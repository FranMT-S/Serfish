const { request, response } = require("express");
const { generarJWT } = require("../helpers/jwt");


const fileUpload = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'fileUploaded'
    });
}

module.exports = {
    fileUpload
}