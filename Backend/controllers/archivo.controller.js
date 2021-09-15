const sql = require('../config/mysqlConnection')
var crypto = require('crypto');
const archivoService = require('../service/archivo.service');


exports.root = async(req,res)=>{
    res.send('Hola desde archivo')
}

exports.uploadFile = async(req,res,next)=>{
    try{
        if(req.files && req.files.media){
            const file = req.files.media;
            const uploadRes = await archivoService.uploadFileToAws(file);
            return res.send(uploadRes)
        }
        const errMsg = {
            message: 'Archivo no encontrado',
            messageCode: 'FILES_NOT_FOUND',
            statusCode: 404
        }
        return res.status(404).send(errMsg)
    } catch (error){
        return next(error);
    }
}

exports.obtenerFoto = async(req,res,next)=>{
    var id = req.query.id
    try{
        const getRes = await archivoService.getFile(id)
        return res.send(getRes)
    } catch (error){
        return next(error);
    }
}

exports.eliminarFoto = async(req,res,next)=>{
    var id = req.query.id
    try{
        const deleteRes = await archivoService.deleteFile(id)
        return res.send(deleteRes)
    }catch(error){
        console.log('Error')
        return next(error)
    }
}


//////////////////////////

/** Subir Archivo
 * 
 * @param {token,name,visibility,image} req 
 * @param {status,msg} res 
 * @returns 
 */
exports.new = async(req,res,next)=>{
    try{
        const {
            token,
            name,
            visibility,
        } = req.body

        const image = req.files.image;
        var key_name,link,type;

        const resUpload = await archivoService.uploadFileToAws(image);
        key_name = resUpload.key
        link = resUpload.fileUrl
        type = resUpload.type


        //DATE
        let date_ob = new Date();
        let day = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();

        sql.query(`Insert Into File(name,id_file_type,link,key_name,id_visibility,date) Values('${name}',${type},'${link}','${key_name}',${visibility},'${year}-${month}-${day}')`,(err,resultFile)=>{
            if(err)
                return res.send({status: 404, msg: err})

            const id = resultFile.insertId;
            sql.query(`Insert Into Files Values ((Select id_user from User where token = '${token}'),${id})`,(err,resultFiles)=>{
                if (err){
                    console.log(err)
                    archivoService.deleteFile(key_name)
                    return res.send({status: 404, msg: err})
                }
                return res.status(200).send({status: 200})
            })

        })

    }catch(error){
        console.log(error)
        return res.send({status:404 , msg:error})
    }
}

/** Eliminar Archivo
 * 
 * @param {id} req 
 * @param {status,msg} res 
 * @returns 
 */
exports.delete = async(req,res)=>{

    try{
        const id = req.query.id
        sql.query(`Select key_name from File where id_file = ${id};`,(err,resultSelect)=>{

            if(resultSelect.length == 0)
                return res.send({status:404, msg:'Archivo no encontrado'})

            const key = resultSelect[0].key_name;
            archivoService.deleteFile(key)
            
            sql.query(`Delete From File Where id_file = ${id};`,(err,resultDelete)=>{

                if(err)
                    return res.send({status:404, msg:err})
                return res.status(200).send({status:200})
            })
        })

    }catch(error){
        return res.send({status:404, msg:error})
    }

}

/**
 * 
 * @param {id,name,visibility,token,password} req 
 * @param {status,msg} res 
 * @returns 
 */
exports.update = async (req,res)=>{

    const id = req.params.id;
    console.log(id)
    const {
        name,
        visibility,
        token,
        password
    } = req.body

    if (!name || !visibility)
        return res.send({status:403, msg:'Existen campos vacíos'})

    try{
        if(token != crypto.createHash('sha256').update(password).digest('base64'))
            return res.send({status:403, msg:'Constraseña Incorrecta'})

        
        let date_ob = new Date();
        let day = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        
        sql.query(`Update File set name = '${name}' , id_visibility = ${visibility}, date = '${year}-${month}-${day}' Where id_file = ${id}`,(err,result)=>{
            
            if(err)
                return res.send({status:404, msg:err})
            
            return res.send({status:200})
        })
        
    }catch(error){
        return res.send({status:404,msg:error})
    }
}

/** Obtener Archivos Publicos De Amigos
 * 
 * @param {token} req 
 * @param {staus,msg,datos} res 
 * @returns 
 */

/**
 * 
 * @param {token} req 
 * @param {status,datos,msg} res 
 * @returns 
 */
exports.friendsFiles = async (req,res)=>{
    const token = req.query.token

    try{
        sql.query(`Select u.username, f.name, f.date, f.link, f.id_file_type from User u, File f, Files fs, Friends fr where
        u.token = '${token}' and u.id_user = fr.id_user1 and fr.id_user2 = fs.id_user and fs.id_file = f.id_file and f.id_visibility = 1;`,(err,result)=>{
            if(err)
                return res.send({status:404,msg:err})
            console.log(result)

            let data = result.map(value=>{
                var date = new Date(value.date)
                let day = ("0" + date.getDate()).slice(-2);
                let month = ("0" + (date.getMonth() + 1)).slice(-2);
                let year = date.getFullYear();
                let fullDate = `${day}/${month}/${year}`
                let dataSchema = {
                    "username": value.username,
                    "name": value.name,
                    "date": fullDate,
                    "link": value.link,
                    "id_file_type": value.id_file_type
                }
                return dataSchema;
            })

            return res.send({status:200, datos:data})
        })
    }catch(error){
        return res.send({status:404,msg:error})
    }

}


/**
 * 
 * @param {token} req 
 * @param {datos,msg,status} res 
 * @returns 
 */
exports.myFiles = async (req,res)=>{
    const token = req.query.token

    try{
        sql.query(`Select f.id_file, f.name, f.link, f.id_file_type, f.id_visibility From User u, Files fs, File f where u.token = '${token}' 
        and u.id_user = fs.id_user and fs.id_file = f.id_file;`,(err,result)=>{
                if(err)
                    return res.send({status:404, msg:err})
                return res.send({staus:200, datos:result})
            })
    }catch(error){
        return res.send({status:404, msg:error})
    }      
}