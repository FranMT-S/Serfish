const fs = require('fs');
const usuario = require('../models/usuario');


const updateImg = async(type, id, archieveName) => {
    if (type === 'usuarios') {
        const user = await usuario.findById(id);
        if (!user) {
            return false;
        }
        const oldPath = `./upload/usuarios/${user.img}`;
        if (fs.existsSync(oldPath)) {
            //borrar la imagen anterior
            fs.unlinkSync(oldPath);
        }
        user.img = archieveName;
        await user.save();
        return true;

    }

}


module.exports = {
    updateImg
}