# Api UStorage

Peticiones que se pueden realizar

- [Obtener Todos Los Usuarios Y La Cantidad De Archivos Publicos](#f1)
- [Registrar Un Usuario Con Foto De Perfil](#f2)
- [Iniciar Sesión](#f3)
- [Agregar Amigo](#f4)
- [Agregar Nuevo Archivo](#f5)
- [Eliminar Archivo](#f6)
- [Actualizar Archivo](#f7)
- [Ver Archivos Públicos De Amigos](#f8)
- [Ver Mis Archivos](#f9)
## Tecnologías Utilizadas

- AWS RDS con Mysql
- S3 Bucket 


## Instalación

Requiere [Node.js](https://nodejs.org/) v10+ para poderse ejecutar.

Instalación NodeJs en ubuntu

```sh
sudo apt-get update
sudo apt install node
sudo apt install npm
```
### Instalación de dependencias

```sh
npm install 
```

### Iniciar Servidor
```sh
node index.js
```

### Campos a tomar en cuenta
> id_visibility: Pude tomar 1 o 2, siendo de visibilidad 'publica' o 'privada' respectivamente
> id_file_type: Puede tomar 1, 2 o 3 siendo 1 'imagen', 2 'pdf' y 3 'texto'


## Funcionalidades
<a name="f1"></a>
### Obtener Usuarios Y Cantidad De Archivos Publicos

Se puede obtener todos los usuarios, sin contar nuestro usuario, y obtener la cantidad de archivos publicos que el usuario contiene

End Point:

```sh
GET: localhost:3000/usuario/getUsers?token=#token
```
Ejemplo Response OK:
```json
[
    {
        "id": 1,
        "username": "prueba",
        "image_url": "imageurl.net",
        "cantidad": 2
    }
]
```

Response Fail:
```json
[
    {
        "status": 404,
        "msg": #errorMessage
    }
]
```

Código Implementado:
```js
const myToken = req.query.token
    try{
        sql.query(`select u.id_user, u.username, u.image_url, count(fs.id_user) as cantidad from User u, Files fs, File f, Friends fr Where
        u.id_user = fs.id_user and fs.id_file = f.id_file and f.id_visibility = 1 and u.token != '${myToken}' and 
        u.id_user not in (select fr.id_user2 from Friends fr, User u  where u.token = '${myToken}' and u.id_user = fr.id_user1 )  group by u.username, u.id_user, u.image_url;
        `,(err,result)=>{
            if (err) throw err;

            
            usuarios = result.map((usuario)=>{
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
    }catch(error){
        res.send({status: 404, msg: error})
    }
```

<a name="f2"></a>
#### Registrar Un Usuario Con Foto De Perfil

End Point:

```sh
POST: https://localhost:3000/usuario/registrar
```

Body:

```sh
{
    "username": 'username',
    "mail": 'mail@gmail.com',
    "password": 'password',
    "image": image
}
```

Response OK:
```sh
{
    status:200,
    token: #token
}
```

Response Fail:
```sh
{
    status:404,
    token: #errorMessage
}
```

Código Implementado:

```js
try{
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
        const token = crypto.createHash('sha256').update(username+password).digest('base64');
        //Encriptar Contrasena
        const hashPass = crypto.createHash('sha256').update(password).digest('base64');

        sql.query(`Insert Into User(token,username,mail,password,image_url) Values('${token}','${username}','${mail}','${hashPass}','${uploadRes.fileUrl}')`,(err,result)=>{
            if(err)
                return res.send({status:404, msg:err.sqlMessage})
            return res.status(200).send({status:200, token: hashPass})
        })

    }catch(error){
        return res.send({status: 404, msg: error})
    }
```
<a name="f3"></a>
## Iniciar Sesión

End Point:
```sh
GET: localhost:3000/usuario/ingresar?usr=usuario&password=contrasena
```

Response OK:
```json
[
    {
        "status": 200,
        "token": #token
    }
]
```

Response Fail:
```json
[
    {
        "status":403,
        "token": 'Usuario ó Contraseña Incorrectos'
    }
]
```
O
```sh
{
    status:404,
    token: #errorMessage
}
```
Codigo Implementado
```js
try{
        const user = req.query.user;
        const password = req.query.password;
        const hashPass = crypto.createHash('sha256').update(password).digest('base64');
        sql.query(`Select token from User where (username = '${user}' or mail = '${user}') and password = '${hashPass}';`,(err,result)=>{
            if(err)
                return res.send({status: 404, msg: err})
                if(result.length == 0)
                    return res.send({status: 403, msg: 'Usuario ó Contraseña Incorrectos'})
                return res.send({status: 200, token: result[0].token})
        })
    }catch(error){
        return res.send({status: 404, msg: error})
    }
```
<a name="f4"></a>
## Agregar amigo

End Point:
```sh
POST: localhost:3000/usuario/amigo
```

Body:
```json
{
    "token": #token,
    "id_amigo": #idAmigo 
}
```

Response OK:
```json
[
    {
        "status": 200
    }
]
```

Response Fail:

```sh
{
    status:404,
    token: #errorMessage
}
```
Codigo Implementado
```js
try{
        const {
            token,
            id_amigo
        } = req.body
        sql.query(`Insert into Friends Values((Select id_user from User where token='${token}'),${id_amigo});`,(err,result)=>{
            if(err)
                return res.send({status: 404, msg:err});
            return res.status(200).send({status:200})
        })
    }catch(error){
        return res.send({status:404, msg: error})
    }
```
<a name="f5"></a>
## Agregar nuevo archivo

End Point:
```sh
POST: localhost:3000/usuario/archivo/nuevo
```

Body:
```json
{
    "token": #token,
    "name": 'archivo.txt',
    "visibility": 1
    "image": imagen
}
```

Response OK:
```json
[
    {
        "status": 200
    }
]
```

Response Fail:

```sh
{
    status:404,
    token: #errorMessage
}
```
Codigo Implementado
```js
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
```
<a name="f6"></a>
## Eliminar Archivo

End Point:
```sh
DELETE: localhost:3000/usuario/archivo/eliminar/:id
```

Response OK:
```json
[
    {
        "status": 200
    }
]
```

Response Fail:

```sh
{
    status:404,
    token: #errorMessage
}
```
Codigo Implementado
```js
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
```
<a name="f7"></a>
## Actualizar Archivo

End Point:
```sh
PUT: localhost:3000/usuario/archivo/actualizar/:id
```

Body:
```json
{
    "name": 'actualizado.pdf',
    "visibility": 1,
    "token": #token
    "password": 'pass'
}
```

Response OK:
```json
[
    {
        "status": 200
    }
]
```

Response Fail:

```sh
{
    status:404,
    token: #errorMessage
}
```
O
```sh
{
    status:403,
    token: 'Existen campos vacíos'
}
```
O
```sh
{
    status:403,
    token: 'Constraseña Incorrecta'
}
```
Codigo Implementado
```js
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
```
<a name="f8"></a>
## Ver Archivos Publicos De Amigos

End Point:
```sh
GET: localhost:3000/usuario/archivo/amigos?token=#token
```

ejemplo Response OK:
```json
{
    "status": 200,
    "datos": [
        {
            "username": "juan",
            "name": "archivo.text",
            "date": "18/10/2022",
            "link": "link",
            "id_file_type": 3
        },
        {
            "username": "juan",
            "name": "archivo1.pdf",
            "date": "15/08/2021",
            "link": "link",
            "id_file_type": 2
        }
    ]
}
```

Response Fail:

```sh
{
    status:404,
    token: #errorMessage
}
```


Codigo Implementado:
```js
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
```
<a name="f9"></a>
## Ver Mis Archivos

End Point:
```sh
GET: localhost:3000/usuario/archivo/mios?token=#token
```

ejemplo Response OK:
```json
{
    "staus": 200,
    "datos": [
        {
            "name": "archivo.png",
            "link": "link",
            "id_file_type": 1,
            "id_visibility": 1
        },
        {
            "name": "archivo.pdf",
            "link": "link",
            "id_file_type": 2,
            "id_visibility": 1
        },
        {
            "name": "viejo",
            "link": "link",
            "id_file_type": 2,
            "id_visibility": 2
        },
        {
            "name": "actualizado",
            "link": "link",
            "id_file_type": 2,
            "id_visibility": 2
        }
    ]
}
```

Response Fail:

```sh
{
    status:404,
    token: #errorMessage
}
```


Codigo Implementado:
```js
const token = req.query.token

    try{
        sql.query(`Select f.name, f.link, f.id_file_type, f.id_visibility From User u, Files fs, File f where u.token = '${token}' 
        and u.id_user = fs.id_user and fs.id_file = f.id_file;`,(err,result)=>{
                if(err)
                    return res.send({status:404, msg:err})
                return res.send({staus:200, datos:result})
            })
    }catch(error){
        return res.send({status:404, msg:error})
    }   
```



