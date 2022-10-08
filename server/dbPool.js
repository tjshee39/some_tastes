const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "sometaste",
  });

db.getConnection(function(err, conn) {
    if(err) console.log(err);
    console.log("Database connected");
})

  module.exports = db;