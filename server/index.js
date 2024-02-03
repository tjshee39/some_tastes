const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');

const db = require('./dbPool.js');
const mybatisMapper = require('mybatis-mapper');
const fileUpload = require('./fileUpload.js');
const uploadImage = fileUpload;
const mapperPath = './src/resources/mappers';

const app = express();

const PORT = process.env.port || 8000;

const corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(bodyParser.json());  //기본적으로 REST API 에서는 데이터 주고받을때 json 데이터 형식으로 주고받음
app.use('/photo', express.static('./restaurantImage'));

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

app.use(history());
app.use(express.static('./dist'));

mybatisMapper.createMapper(
  [`${mapperPath}/restaurantMapper.xml`,
  `${mapperPath}/reviewMapper.xml`]);

const format = {language: 'sql', indent: ' '};

// restaurantList::GET
// 식당 목록 출력
app.get("/api/restaurantList", async function(req, res) {
  const sqlQuery = mybatisMapper.getStatement('restaurantMapper', 'selectRestaurantList');

  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

// restaurantDatail::GET
// 식당 정보 출력
app.get("/api/restaurantDetail/:bno", async function(req, res) {
  const param = {bno: req.params.bno}
  const sqlQuery = mybatisMapper.getStatement('restaurantMapper', 'selectRestaurantDetail', param, format);

  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

// existRestaurant::GET
// 식당 존재 여부
app.get("/api/existRestaurant", async function(req, res) {
  const param = {restaurant: req.query.restaurant};
  const sqlQuery = mybatisMapper.getStatement('restaurantMapper', 'selectRestaurantExist', param, format);

  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log("ERROR::", err);
    } else {
      res.send(result);
    }
  });
});

// createRestaurant::POST
// 식당 정보 등록
app.post("/api/createRestaurant", uploadImage.single('photo'), (req, res) => {
  const param = {
    restaurant: req.body.restaurant,
    address: req.body.address,
    photo: '/photo/' +  req.file.filename
  }

  const sqlQuery = mybatisMapper.getStatement('restaurantMapper', 'insertRestaurant', param, format);

  db.query(sqlQuery, (err, result) => {
    if (result !== undefined) {
      res.send(result);
    } else {
      res.send();
    }
  });
});

// updateRestaurant::POST
// 식당 정보 수정
app.post("/api/updateRestaurant/:bno", uploadImage.single('photo'), (req, res) => {
  let photo;

  if (typeof(req.file) == 'undefined') {
    photo = req.body.existingPhoto;
  } else {
    photo = '/photo/' + req.file.filename;
  }

  const param = {
    restaurant: req.body.restaurant,
    address: req.body.address,
    photo: photo
  }

  const sqlQuery = mybatisMapper.getStatement('restaurantMapper', 'updateRestaurant', param, format);

  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
  
});

// deleteRestaurant::POST
// 식당 삭제
app.post("/api/deleteRestaurant/:bno", (req, res) => {
  const param = {bno: req.params.bno}

  const sqlQuery = mybatisMapper.getStatement('restaurantMapper', 'deleteREstaurant', param, format);

  db.query(sqlQuery, (err, result) => {
    res.send(result);
  })
});

// createReview::POST
// 리뷰 등록
app.post("/api/createReview", async (req, res) => {
  const param = {
    bno: req.body.bno,
    restaurant: req.body.restaurant,
    review: req.body.content,
    rating: req.body.rating
  };

  // 등록
  const sqlQuery = mybatisMapper.getStatement('reviewMapper', 'insertReview', param, format);

  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log("ERROR::", err);
    } else {
      // 등록 완료 -> 별점 구하는 함수 호출
      getAvgRating();
    }
  });

  // 별점 평균 구하기
  async function getAvgRating() {
    const param = {bno: req.body.bno}
    const sqlQuery = mybatisMapper.getStatement('reviewMapper', 'selectReviewAvg', param, format);

    db.query(sqlQuery, (err, result) => {
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
    const param = {
      bno: req.body.bno,
      rating: rating
    }

    const sqlQuery = mybatisMapper.getStatement('reviewMapper', 'updateReviewAvg', param, format);

    db.query(sqlQuery, (err, result) => {
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
  const param = {bno: req.params.bno};
  const sqlQuery = mybatisMapper.getStatement('reviewMapper', 'selectReviewList', param, format);


  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log("ERROR::", err)
    } else {
      res.send(result);
    }
  });
});

// reviewChart::GET
// 리뷰 별점 차트
app.get("/api/reviewChart/:bno", async function(req, res) {
  const param = {bno: req.params.bno};
  const keys = ['rating', 'count'];
  let ratingCount = [{}, {}, {}, {}, {}];

  for (var i=0; i<5; i++) {
    ratingCount[i][keys[0]] = i+1;
    ratingCount[i][keys[1]] = 0;
  }

  let count = [];

  const sqlQuery = mybatisMapper.getStatement('reviewMapper', 'selectRatingCount', param, format);

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
    }
  })
});
