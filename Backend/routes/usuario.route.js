const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const archivoRouter = require('../routes/archivo.route')

router.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
}
));

router.use('/archivo',archivoRouter)

router.get('/getUsers',usuarioController.getUsers);
router.post('/registrar',usuarioController.signin);
router.get('/ingresar',usuarioController.login);
router.post('/verificarPass',usuarioController.verificarPass);
router.post('/amigo',usuarioController.addFriend);


module.exports = router;