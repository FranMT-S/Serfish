const nodemailer = require("nodemailer");

const sendEmail = (username, email, token, ) => {
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
                        <a href="http://localhost:4200/auth/reset-password/${token}" style="color: white; text-decoration: none;">Restablecer contraseña</a>
                    </button>
                </div>
            </div>
        </center>
        `, // html body
    });
}

module.exports = {
    sendEmail
};