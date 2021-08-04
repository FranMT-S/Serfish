const { Router } = require("express");
const { createEvent, getEvents, deleteEvent } = require("../controllers/events");


const router = Router();

//Crear Evento
router.post('/', createEvent);

router.get('/', getEvents);
//Eliminar Evento
router.delete("/:id", deleteEvent);


module.exports = router;