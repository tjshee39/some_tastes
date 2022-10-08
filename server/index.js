const cors = require('cors');
const express = require("express");

const db = require('./dbPool.js');

const app = express();
// const mysql = require("mysql");
const PORT = process.env.port || 8000;

let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

app.get("/restaurantList", (req, res) => {
  const sqlQuery = "SELECT restaurant, photo, rating FROM tbl_restaurants ORDER BY bno DESC;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.post("/createRestaurant", (req, res) => {
  var restaurant = req.body.restaurant;
  var address = req.body.address;

  const sqlQuery = "INSERT INTO tbl_restaurants (restaurant, address) VALUES (?, ?);"
  db.query(sqlQuery, [restaurant, address], (err, result) => {
    res.send(result);
  });
});

app.post("/updateRestaurant", (req, res) => {
  var restaurant = req.body.restaurant;
  var address = req.body.address;

  const sqlQuery =
    "UPDATE tbl_restaurants SET restaurant = ?, address = ? VALUES (?,?);";
  db.query(sqlQuery, [restaurant, address], (err, result) => {
    res.send(result);
  });
});