const mysql = require("mysql");

const db = mysql.createPool({
    host: "122.45.13.226:3306",
    user: "usr_somet",
    password: "1234",
    database: "sometaste",
  });

db.getConnection(function(err, conn) {
    if(err) console.log(err);
    console.log("Database connected");
})

  module.exports = db;