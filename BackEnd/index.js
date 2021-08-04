// Paso 1
// Importar de librerias
require("dotenv").config(); //Cargamos las variables de entorno.
const express = require('express'); //Framework express
const cors = require("cors"); //
const { dbConnection } = require('./database/config') //Conexion hacia la base de datos

// Paso 2
// Crear el servidor/aplicacion de express
const app = express();

//Paso 3
//Configuraciones
app.use(cors()); //Esta es una configuracion por defecto del CORS, protege un poco el BackEnd
app.use(express.json()); //Transformamos los bodys en json, es una parseo del body

//Paso 4
//Conexion a la BD.
dbConnection();

// app.get("/", (req,res)=>{
//     res.json({
//         ok:true,
//         msj:"Un get desde el index, mejor hacer desde el routes"
//     });
// });

// Definicion de rutas y controladores
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/organizaciones", require("./routes/organizaciones"));
app.use("/api/login", require("./routes/login"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/calendar", require("./routes/calendar"));

// Paso final
// Levantar el servico
app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en puerto " + process.env.PORT)
});