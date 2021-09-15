const sql = require('../config/mysqlConnection')
var crypto = require('crypto');
const archivoService = require('../service/archivo.service');


/** Todos los usuarios y la cantidad de archivos publicos
 * 
 * @param {token} req 
 * @param {usuarios} res 
 * @param {error} next 
 * @returns 
 */
exports.getUsers = async (req, res, next) => {
    const myToken = req.query.token
    try {
        /**
         * `select u.id_user, u.username, u.image_url, count(fs.id_user) as cantidad from User u, Files fs, File f, Friends fr Where
        u.id_user = fs.id_user and fs.id_file = f.id_file and f.id_visibility = 1 and u.token != '${myToken}' and 
        u.id_user not in (select fr.id_user2 from Friends fr, User u  where u.token = '${myToken}' and u.id_user = fr.id_user1 )  group by u.username, u.id_user, u.image_url;`
         */
        sql.query(`select u.id_user, u.username, u.image_url, count(f.id_file) as cantidad, f.id_visibility from User u
        left join Files fl on fl.id_user = u.id_user
        left join File f on fl.id_file = f.id_file and f.id_visibility !=  2
        where u.token != '${myToken}' and u.id_user not in (select fr.id_user2 from Friends fr, User u  where 
            u.token = '${myToken}' and u.id_user = fr.id_user1 )  group by u.id_user;`, (err, result) => {
            if (err) throw err;


            usuarios = result.map((usuario) => {
                let usuarioSchema = {
                    "id": usuario.id_user,
                    "username": usuario.username,
                    "image_url": usuario.image_url,
                    "cantidad": usuario.cantidad
                }
                return usuarioSchema
            })
            res.send(usuarios)
        })
    } catch (error) {
        return res.send({ status: 404, msg: error })
    }
}

/** Para Registrar Un Usuario
 * 
 * @param {username,mail,password,image} req 
 * @param {status,token,error,msg} res 
 * @returns 
 */
exports.signin = async (req, res, next) => {

    try {
        //Obtener Datos
        const {
            username,
            mail,
            password
        } = req.body

        const image = req.files.image

        //Subir la foto
        const uploadRes = await archivoService.uploadFileToAws(image)

        //Crear Token
        const token = crypto.createHash('sha256').update(username + password).digest('base64');
        //Encriptar Contrasena
        const hashPass = crypto.createHash('sha256').update(password).digest('base64');

        sql.query(`Insert Into User(token,username,mail,password,image_url) Values('${token}','${username}','${mail}','${hashPass}','${uploadRes.fileUrl}')`, (err, result) => {
            if (err)
                return res.send({ status: 404, msg: err.sqlMessage })
            return res.status(200).send({ status: 200, token: hashPass })
        })

    } catch (error) {
        return res.send({ status: 404, msg: error })
    }
}

/** Hacer login
 * 
 * @param {user,password} req 
 * @param {token,username,image_url} res 
 * @returns 
 */
exports.login = async (req, res, next) => {
    try {
        const user = req.query.user;
        const password = req.query.password;
        const hashPass = crypto.createHash('sha256').update(password).digest('base64');
        sql.query(`Select token, username, image_url from User where (username = '${user}' or mail = '${user}') and password = '${hashPass}';`, (err, result) => {
            if (err)
                return res.send({ status: 404, msg: err })
            if (result.length == 0)
                return res.send({ status: 403, msg: 'Usuario ó Contraseña Incorrectos' })
            return res.send({ status: 200, token: result[0].token, username: result[0].username, image_url: result[0].image_url })
        })
    } catch (error) {
        return res.send({ status: 404, msg: error })
    }
}

/** Verificar password de usaurio al subir un archivo
 * 
 * @param {password} req 
 * @param {status,msg} res 
 * @returns 
 */
exports.verificarPass = async (req, res, next) => {
    try {
        const {
            token,
            password
        } = req.body
        const hashPass = crypto.createHash('sha256').update(password).digest('base64');
        sql.query(`Select * from User where password = '${hashPass}' and token = '${token}';`, (err, result) => {
            if (err)
                return res.send({ status: 404, msg: err })
            if (result.length == 0)
                return res.send({ status: 403, msg: 'incorrecto' })
            return res.send({ status: 200, msg: 'correcto' })
        })
    } catch (error) {
        return res.send({ status: 404, msg: error })
    }
}

/** Agrgar un amigo
 * 
 * @param {token,id_amigo} req 
 * @param {status} res 
 * @returns 
 */
exports.addFriend = async (req, res, next) => {
    try {
        const {
            token,
            id_amigo
        } = req.body
        sql.query(`Insert into Friends Values((Select id_user from User where token='${token}'),${id_amigo});`, (err, result) => {
            if (err)
                return res.send({ status: 404, msg: err });
            return res.status(200).send({ status: 200 })
        })
    } catch (error) {
        return res.send({ status: 404, msg: error })
    }
}