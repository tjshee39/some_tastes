// 파일 업로드
const fs = require('fs');
const multer = require('multer');

// 날짜+시간 포맷팅
const dateFormat = (date) => {
  const yyyy = date.getFullYear().toString()
  const MM = pad(date.getMonth() + 1, 2)
  const dd = pad(date.getDate(), 2)
  const hh = pad(date.getHours(), 2)
  const mm = pad(date.getMinutes(), 2)
  const ss = pad(date.getSeconds(), 2)

  return yyyy + MM + dd + hh + mm + ss
}

// 문자 결합
const pad = (number, length) => {
  let str = '' + number

  while (str.length < length) {
    str = '0' + str
  }

  return str
}

const date = dateFormat(new Date())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = './restaurantImage/'
    // 폴더 없으면 만들어줌
    fs.mkdirSync(path, { recursive: true })
    cb(null, path);
  },
  filename: function(req, file, cb){
    const restaurant = req.body.restaurant;
    // 파일명: 날짜시간_식닥명
    const imgName = date + "_" + restaurant + '.png';
    cb(null, `${imgName}`);
  }
});
const fileUpload = multer({storage: storage});

module.exports = fileUpload;