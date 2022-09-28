const cors = require('cors');
const express = require("express");

const app = express();
const mysql = require("mysql");
const PORT = process.env.port || 8000;

let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

app.use(cors(corsOptions));

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "sometaste",
});

app.get("/restaurantList", (req, res) => {
  const sqlQuery = "SELECT restaurant, photo, rating FROM tbl_restaurants;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});