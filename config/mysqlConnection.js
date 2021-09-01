const dotenv = require('dotenv').config();

const mysql = require('mysql2');

const con = mysql.createConnection({
    host    : process.env.RDS_HOST,
    user    : process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    port    : '3306'   
});

con.connect(function(err){
    if (err) throw err;
    console.log('connected')
});

module.exports = con;
