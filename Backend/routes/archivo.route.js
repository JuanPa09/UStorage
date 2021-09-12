const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const archivoController = require('../controllers/archivo.controller');

/*router.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
}
));*/

router.post('/upload',archivoController.uploadFile);

router.get('/get',archivoController.obtenerFoto);

router.get('/delete',archivoController.eliminarFoto)

router.get('/',archivoController.root);


router.post('/nuevo',archivoController.new)
router.delete('/eliminar/:id',archivoController.delete)
router.put('/actualizar/:id',archivoController.update)
router.get('/amigos',archivoController.friendsFiles)
router.get('/mios',archivoController.myFiles)

module.exports = router;