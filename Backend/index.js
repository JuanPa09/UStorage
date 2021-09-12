var express = require('express')
var cors = require('cors')
var os = require('os');
var hostname = os.hostname();
const port = 3000

var app = express()
app.use(express.json({limit: '10mb',extended:true}))
app.use(express.urlencoded({limit: '10mb',extended:true}))
app.use(cors())

const routerArchivo = require('./routes/archivo.route');
const routerUsuario = require('./routes/usuario.route');

app.use('/archivo',routerArchivo)
app.use('/usuario/',routerUsuario)

app.get('/' , (req , res)=>{
   res.send(`Se accedio correctamente desde ${hostname}`);
})

app.listen(port,()=>{
    console.log('Corriendo en el puerto ' + port)
})