# 🌝맛점몇점<br>

## How to start

1. make `.env`

```bash
REACT_APP_HOME_URL=http://localhost:8000

REACT_APP_DB_HOST=localhost || your ip
REACT_APP_DB_USER=user_name
REACT_APP_DB_PW=user_pw
REACT_APP_DB_SCHEMA=schema_name
REACT_APP_DB_PORT=port

REACT_APP_MODE=mode

NAVER_SEARCH_API_ID=naver_search_api_id
NAVER_SEARCH_API_SECRET=naver_search_api_secret
```

2. frontend<br>
   `npm run frontend`
3. backend<br>
   `npm run backend`
4. open browser<br>
   `http://localhost:3000`
5. <span style="color:#979797;">~~come visit me~~</span><br>
   ~~`https://some-tastes-1sunny.koyeb.app/`~~

<!-- <a href="https://some-tastes-1sunny.koyeb.app/">
  `https://some-tastes-1sunny.koyeb.app/`
</a> -->

## Project introduction

#### 📌메인화면

<p align="center">
  <img src="https://user-images.githubusercontent.com/55904021/209618000-48fdff14-1384-4179-a6d8-56abdcb558f6.png"/>
</p>

- 음식점 목록 조회

- 해당 음식점 리뷰 평점

- 음식점 등록 버튼

<hr/><br/>

#### 📌음식점 등록

<p align="center">
  <img src="https://user-images.githubusercontent.com/55904021/209618954-5cda8f0a-12c2-4d3d-90b3-98f13e002717.png"/>
</p>

- 음식점 이름, 주소, 이미지(한장) 입력

- 음식점 이름은 unique key

- 이미지 용량은 500MB 이하

<hr/><br/>

#### 📌음식점 조회 및 리뷰

<p align="center">
  <img src="https://user-images.githubusercontent.com/55904021/209619980-3d68027b-355b-4347-933e-6fe97a4680d1.png"/>
</p>

- 등록한 음식점 정보 출력

- 리뷰 등록 가능(별점, 내용)

<p align="center">
  <img src="https://user-images.githubusercontent.com/55904021/209620167-42514dd5-494e-426c-a7a7-770021a5e016.png"/>
</p>

- 리뷰 별점 현황 차트

- 리뷰 목록

<hr/><br/>

#### 📌음식점 수정

<p align="center">
  <img src="https://user-images.githubusercontent.com/55904021/209621394-de06cf68-b676-4422-90a0-68914078f6a1.png"/>
</p>

- 음식점 주소와 이미지 변경

- 음식점 이름은 unique key이기 때문에 수정 불가능

<hr/><br/>

#### 📌음식점 삭제

- 메인화면의 음식점 목록에 출력되지 않음(데이터 삭제X)

