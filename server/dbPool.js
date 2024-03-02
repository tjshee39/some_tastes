const mysql = require("mysql2");
const dotenv = require('dotenv').config().parsed;

const db = mysql.createPool({
    host: process.env.REACT_APP_DB_HOST,
    user: process.env.REACT_APP_DB_USER,
    password: process.env.REACT_APP_DB_PW,
    database: process.env.REACT_APP_DB_SCHEMA,
    port: process.env.REACT_APP_DB_PORT,
    insecureAuth: true,
});

db.getConnection(function(err, conn) {
    if(err) {
        console.log(err);
    } else {
        console.log("Database connected");
    }
})

module.exports = db;