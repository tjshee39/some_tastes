// 파일 업로드
const fs = require('fs');
const multer = require('multer');

// 날짜+시간 포맷팅
Date.prototype.YYYYMMDDHHMMSS = function () {
  var yyyy = this.getFullYear().toString();
  var MM = pad(this.getMonth() + 1,2);
  var dd = pad(this.getDate(), 2);
  var hh = pad(this.getHours(), 2);
  var mm = pad(this.getMinutes(), 2)
  var ss = pad(this.getSeconds(), 2)

  return yyyy +  MM + dd+  hh + mm + ss;
};

// 문자 결합
function pad(number, length) {
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

const date = new Date().YYYYMMDDHHMMSS();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = './restaurantImage/';
    // 폴더 없으면 만들어줌
    fs.mkdirSync(path, { recursive: true });
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