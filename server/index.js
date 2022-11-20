const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');

const db = require('./dbPool.js');

const app = express();

// 파일 업로드
const fs = require('fs');
const multer = require('multer');
const uploadImage = multer({dest: './uploadImage/'});
app.use('/photo', express.static('./uploadImage'));

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
app.get("/restaurantList", async function(req, res) {
  const sqlQuery = "SELECT * FROM tbl_restaurants WHERE available = 'Y' ORDER BY bno DESC";

  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

// restaurantDatail::GET
// 식당 정보 출력
app.get("/restaurantDetail/:bno", async function(req, res) {
  const {bno} = req.params;
  // console.log("bno:", bno);
  const sqlQuery = "SELECT restaurant, address, photo, rating FROM tbl_restaurants WHERE bno = " + bno;
  db.query(sqlQuery, (err, result) => {
    // console.log("===== restaurantDetail =====");
    // console.log(result);
    res.send(result);
  });
});

// createRestaurant::POST
// 식당 정보 등록
app.post("/createRestaurant", uploadImage.single('photo'), (req, res) => {
  let restaurant = req.body.restaurant;
  let address = req.body.address;
  // console.log("서버_restaurant", req.body.restaurant);
  // console.log("서버_address", req.body.address);
  // console.log("서버_file", req.file);

  let photo = 'http://localhost:8000/photo/' +  req.file.filename;

  const sqlQuery = "INSERT INTO tbl_restaurants (restaurant, address, photo) VALUES (?, ?, ?);"
  db.query(sqlQuery, [restaurant, address, photo], (err, result) => {
    res.send(result);
  });
});

// updateRestaurant::POST
// 식당 정보 수정
app.post("/updateRestaurant/:bno", uploadImage.single('photo'), (req, res) => {
  let restaurant = req.body.restaurant;
  let address = req.body.address;
  let photo;

  if (typeof(req.file) == 'undefined') {
    photo = req.body.existingPhoto;
  } else {
      photo = 'http://localhost:8000/photo/' + req.file.filename;
      // console.log('filename', photo);
  }

  // console.log("restaurant", photo);

  const sqlQuery =
    "UPDATE tbl_restaurants SET restaurant = ?, address = ?, photo = ? WHERE restaurant = ?";
  db.query(sqlQuery, [restaurant, address, photo, restaurant], (err, result) => {
    // console.log("===== update restaurant =====");
    // console.log(result);
    res.send(result);
  });
  
});

// deleteRestaurant::POST
// 식당 삭제
app.post("/deleteRestaurant/:bno", (req, res) => {
  const {bno} = req.params;

  const sqlQuery = `UPDATE tbl_restaurants SET available = 'N' WHERE bno = ${bno}`;

  db.query(sqlQuery, (err, result) => {
    // console.log("==== delete restaurant ====");
    res.send(result);
  })
});

// createReview::POST
// 리뷰 등록
app.post("/createReview", async (req, res) => {
  let data = [
    bno = req.body.bno,
    restaurant = req.body.restaurant,
    content = req.body.content,
    rating = req.body.rating
  ];

  // 등록
  const sqlQuery = "INSERT INTO tbl_reviews (bno, restaurant, review, rating) VALUES (?, ?, ?, ?);"
  db.query(sqlQuery, data, (err, result) => {
    if (err) {
      console.log("ERROR::", err);
    } else {
      // 등록 완료 -> 별점 구하는 함수 호출
      getAvgRating();
    }
  });

  // 별점 평균 구하기
  async function getAvgRating() {
    let sqlQuery2 = `SELECT ROUND(AVG(rating), 1) as rating FROM tbl_reviews WHERE bno='${data[0]}'`
    await db.query(sqlQuery2, (err, result) => {
      if (err) {
        console.log("ERROR::", err);
      } else {
        // 별점 평균 구하면 -> 해당 식당 별점 수정하는 함수 호출
        setAvgRating(result[0].rating);
      }
    });
  }

  // 해당 식당 별점 -> 별점평균으로 수정
  function setAvgRating(rating) {
    let sqlQuery3 = `UPDATE tbl_restaurants SET rating = ${rating} WHERE bno='${data[0]}'`;
    db.query(sqlQuery3, (err, result) => {
      if (err) {
        console.log("ERROR::", err);
      } else {
        res.send(result);
      }
    });
  }
});

// reviewList::GET
// 리뷰 목록 출력
app.get("/reviewList/:bno", async function(req, res) {
  const {bno} = req.params;

  const sqlQuery = `SELECT * FROM tbl_reviews WHERE bno=${bno} AND available='Y'`;

  db.query(sqlQuery, (err, result) => {
    for (var i in result) {
      result[i].regdate = result[i].regdate.toISOString().slice(0, 10);
    }
    
    res.send(result);
  });
});
