const fs = require('fs');
const usuario = require('../models/usuario');
const documento = require('../models/documento');


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

const saveDocument = async(type, id, archieveName) => {
    if (type === 'documentos') {
        const documento = await documento.findById(id);
        console.log(documento)
        documento.file = archieveName;
        await documento.save();
        return true;

    }
}


module.exports = {
    updateImg,
    saveDocument
}