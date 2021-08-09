/*
    Ruta: /api/contact 
*/
const { Router } = require("express");
const { sendInfo } = require("../controllers/contact");

const router = Router();

router.post('/', sendInfo);


module.exports = router;