const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');

const db = require('./dbPool.js');

const app = express();

// 파일 업로드
const fs = require('fs');
const multer = require('multer');
const uploadImage = multer({dest: './uploadImage/'});

const PORT = process.env.port || 8000;

let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(bodyParser.json());//기본적으로 REST API 에서는 데이터 주고받을때 json 데이터 형식으로 주고받음

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});


// restaurantList::GET
// 식당 목록 출력
app.get("/restaurantList", (req, res) => {
  const sqlQuery = "SELECT restaurant, photo, rating FROM tbl_restaurants ORDER BY bno DESC;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

// createRestaurant::POST
// 식당 정보 등록
app.use('/photo', express.static('./uploadImage'));
app.post("/createRestaurant", uploadImage.single('photo'), (req, res) => {
  let restaurant = req.body.restaurant;
  let address = req.body.address;
  console.log("서버_restaurant", req.body.restaurant);
  console.log("서버_address", req.body.address);
  console.log("서버_file", req.file);

  let photo = 'http://localhost:8000/photo/' +  req.file.filename;

  const sqlQuery = "INSERT INTO tbl_restaurants (restaurant, address, photo) VALUES (?, ?, ?);"
  db.query(sqlQuery, [restaurant, address, photo], (err, result) => {
    res.send(result);
  });
});

// updateRestaurant::POST
// 식당 정보 수정
app.post("/updateRestaurant", (req, res) => {
  let restaurant = req.body.restaurant;
  let address = req.body.address;
  let photo = 'http://localhost:3000/photo/' + req.file.filename;

  const sqlQuery =
    "UPDATE tbl_restaurants SET restaurant = ?, address = ?, photo = ? WHERE restaurant = ?";
  db.query(sqlQuery, [restaurant, address, photo, restaurant], (err, result) => {
    res.send(result);
  });
});