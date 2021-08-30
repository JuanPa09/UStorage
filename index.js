var express = require('express')
var cors = require('cors')
var os = require('os')
var hostname = os.hostname();

port = 3000

var app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get('/' , (req , res)=>{

   res.send(`hello from ${hostname}`)

})

app.listen(port,()=>{
    console.log('Corriendo en el puerto ' + port)
})