const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const history = require('connect-history-api-fallback');

const db = require('./dbPool.js');
const fileUpload = require('./fileUpload.js');
const uploadImage = fileUpload;

const app = express();
app.use('/photo', express.static('./restaurantImage'));

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

app.use(history());
app.use(express.static('./dist'));

// restaurantList::GET
// 식당 목록 출력
app.get("/api/restaurantList", async function(req, res) {
  const sqlQuery = "SELECT * FROM tbl_restaurants WHERE available = 'Y' ORDER BY bno DESC";

  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

// restaurantDatail::GET
// 식당 정보 출력
app.get("/api/restaurantDetail/:bno", async function(req, res) {
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
app.post("/api/createRestaurant", uploadImage.single('photo'), (req, res) => {
  let restaurant = req.body.restaurant;
  let address = req.body.address;

  let photo = '/photo/' +  req.file.filename;

  const sqlQuery = "INSERT INTO tbl_restaurants (restaurant, address, photo) VALUES (?, ?, ?);"
  db.query(sqlQuery, [restaurant, address, photo], (err, result) => {
    res.send(result);
  });
});

// updateRestaurant::POST
// 식당 정보 수정
app.post("/api/updateRestaurant/:bno", uploadImage.single('photo'), (req, res) => {
  let restaurant = req.body.restaurant;
  let address = req.body.address;
  let photo;

  if (typeof(req.file) == 'undefined') {
    photo = req.body.existingPhoto;
  } else {
      photo = '/photo/' + req.file.filename;
  }

  const sqlQuery ="UPDATE tbl_restaurants SET restaurant = ?, address = ?, photo = ? WHERE restaurant = ?";
  db.query(sqlQuery, [restaurant, address, photo, restaurant], (err, result) => {
    // console.log("===== update restaurant =====");
    // console.log(result);
    res.send(result);
  });
  
});

// deleteRestaurant::POST
// 식당 삭제
app.post("/api/deleteRestaurant/:bno", (req, res) => {
  const {bno} = req.params;

  const sqlQuery = `UPDATE tbl_restaurants SET available = 'N' WHERE bno = ${bno}`;

  db.query(sqlQuery, (err, result) => {
    // console.log("==== delete restaurant ====");
    res.send(result);
  })
});

// createReview::POST
// 리뷰 등록
app.post("/api/createReview", async (req, res) => {
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
app.get("/api/reviewList/:bno", async function(req, res) {
  const {bno} = req.params;

  const sqlQuery = `SELECT rno, restaurant, bno, rating, review, DATE_FORMAT(regdate, "%Y-%m-%d") as regdate
                     FROM tbl_reviews WHERE bno=${bno} AND available='Y' ORDER BY rno desc`;

  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

// reviewChart::GET
// 리뷰 별점 차트
app.get("/api/reviewChart/:bno", async function(req, res) {
  const {bno} = req.params;
  const keys = ['rating', 'count'];
  let ratingCount = [{}, {}, {}, {}, {}];
  for (var i=0; i<5; i++) {
    ratingCount[i][keys[0]] = i+1;
    ratingCount[i][keys[1]] = 0;
  }

  let count = [];

  const sqlQuery = `SELECT rating, COUNT(*) as count FROM tbl_reviews WHERE bno=${bno} GROUP BY rating ORDER BY rating ASC`;

  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error(err);
    } else {

      for (i in result) {
        let rating = result[i].rating;
        ratingCount[rating-1][keys[1]] = result[i].count;
      }

      for (i in ratingCount) {
        count.push(ratingCount[i].count);
      }

      res.send(count);
    };
  })
});
