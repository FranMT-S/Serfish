const nodemailer = require("nodemailer");

const sendEmail = (username, email, token,url) => {
    // console.log("Email: ",email," ","Token: :",token);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, //587,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "serfishsw@gmail.com", // generated ethereal user
            pass: "vchbvzkobnvfhbsl", // generated ethereal password
        },
    });

    // send mail with defined transport object
    return transporter.sendMail({
        from: '"SerFish" <serfishsw@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Forgot Password", // Subject line
        html: `
        <center>
            <div style="width: 50vw; height: 70vh; background-color: #f8f8f8; border-radius: 10px; color: black; font-family: Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;">
                <div style="text-align: center; padding-top: 30px;">
                    <img style="width: 60px;" src="https://raw.githubusercontent.com/JeanlucBoquin/IS801-IngenieriaSoftware-Proyecto/main/FrontEnd/fishingStudy-App/src/assets/toolbar/pescado.png" alt="">
                    <h1>SerFish</h1>
                </div>
                <div style="width: 95%; background-color: #ffff; margin-top: 50px; border-radius: 10px;">
                    <h2 style="padding-top: 40px;">Hola, ${username}:</h2>
                    <p style="text-align: justify; margin: 30px 60px;">Haz clic en el siguiente botón para restablecer tu contraseña de SerFish. Si no has solicitado una nueva contraseña, ignora este correo.</p>
                    <button style=" background-color: #3f51b5;
                                    border: none;
                                    border-radius: 5px;
                                    color: white;
                                    padding: 15px 32px;
                                    text-align: center;
                                    text-decoration: none;
                                    display: inline-block;
                                    font-size: 16px;
                                    margin: 0px 0px 15px;
                                    cursor: pointer;">
                        <a 
                       
                        href="${url}/auth/reset-password/${token}" style="color: white; text-decoration: none;">Restablecer contraseña</a>
                    </button>
                </div>
            </div>
        </center>
        `, // html body
    });
};
// href="http://serfish.herokuapp.com/auth/reset-password/${token}" style="color: white; text-decoration: none;">Restablecer contraseña</a>


const sendThanks = (nombre, email, organizacion) => {
    // Correo al usuario que contacto
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, //587,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "serfishsw@gmail.com", // generated ethereal user
            pass: "vchbvzkobnvfhbsl", // generated ethereal password
        },
    });

    // send mail with defined transport object
    return transporter.sendMail({
        from: '"SerFish" <serfishsw@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Se ha contactado con SerFish", // Subject line
        html: `
        <center>
            <div style="width: 50vw; height: auto;overflow-y:scroll; background-color: #f8f8f8; border-radius: 10px; color: black; font-family: Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;">
                <div style="text-align: center; padding-top: 30px;">
                    <img style="width: 60px;" src="https://raw.githubusercontent.com/JeanlucBoquin/IS801-IngenieriaSoftware-Proyecto/main/FrontEnd/fishingStudy-App/src/assets/toolbar/pescado.png" alt="serFish Logo">
                    <h1>SerFish</h1>
                </div>
                <div style="width: 95%; background-color: #ffff; margin-top: 50px; border-radius: 10px;">
                    <h2 style="padding-top: 40px;">Hola, ${nombre}:</h2>
                    <p style="text-align: left; margin: 30px 60px 30px; font-size: 1.2em">
                        Gracias por ponerse en contacto con nosotros, para nosotros, usted y su organizacion (${organizacion}), son de gran importancia. En breves un miembro de nuestro equipo se pondra en contacto.
                        <br><br>
                        <small style="font-size: 0.8em;color: gray;">Si no has solicitado contactarte con nosotros, ignora este correo.</small>
                    </p>
                </div>
            </div>
        </center>
        `, // html body
    });
};

const sendContact = (nombre, email, organizacion, mensaje) => {
    // Correo al usuario que contacto
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, //587,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "serfishsw@gmail.com", // generated ethereal user
            pass: "vchbvzkobnvfhbsl", // generated ethereal password
        },
    });

    // send mail with defined transport object
    return transporter.sendMail({
        from: `"SerFish" <serfishsw@gmail.com>`, // sender address
        to: `serfishsw@gmail.com`, // list of receivers
        subject: `${nombre} se han contactado con SerFish`, // Subject line
        html: `
        <center>
            <div style="width: 50vw; height: auto;overflow-y:scroll; background-color: #f8f8f8; border-radius: 10px; color: black; font-family: Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;">
                <div style="text-align: center; padding-top: 30px;">
                    <img style="width: 60px;" src="https://raw.githubusercontent.com/JeanlucBoquin/IS801-IngenieriaSoftware-Proyecto/main/FrontEnd/fishingStudy-App/src/assets/toolbar/pescado.png" alt="serFish Logo">
                    <h1>SerFish</h1>
                </div>
                <div style="width: 95%; background-color: #ffff; margin-top: 50px; border-radius: 10px;">
                    <h2 style="padding-top: 40px;">${nombre} Se ha contactado con nuestro equipo</h2>
                    <h3 style="padding-top: 20px;">Detalles del mensaje:</h3>
                    <p style="text-align: left; margin: 30px 60px 30px; font-size: 1.2em">
                        <table style="border-color:black;border-style:solid;border-width:1px;">
                            <tbody>
                                <tr>
                                    <td style="border-color:black;border-style:solid;border-width:1px;">Nombre: </td>
                                    <td style="border-color:black;border-style:solid;border-width:1px;">${nombre}</td>
                                </tr>
                                <tr>
                                    <td style="border-color:black;border-style:solid;border-width:1px;">Correo: </td>
                                    <td style="border-color:black;border-style:solid;border-width:1px;">${email}</td>
                                </tr>
                                <tr>
                                    <td style="border-color:black;border-style:solid;border-width:1px;">Organizacion: </td>
                                    <td style="border-color:black;border-style:solid;border-width:1px;">${organizacion}</td>
                                </tr>
                                <tr>
                                    <td style="border-color:black;border-style:solid;border-width:1px;">Mensaje: </td>
                                    <td style="border-color:black;border-style:solid;border-width:1px;">${mensaje}</td>
                                </tr>
                            </tbody>
                        </table>
                    </p>
                </div>
            </div>
        </center>
        `, // html body
    });
};

module.exports = {
    sendEmail,
    sendThanks,
    sendContact
};