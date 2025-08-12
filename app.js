// express: Node.js에서 서버를 만들고 다루기 쉽게 해주는 프레임워크

const express = require("express"); // express 불러오기
const mongoose = require("mongoose"); // db연결 위해 mongoos도 들고오기
require("dotenv").config(); // .env 파일에 있는 값들을 Node.js가 읽을 수 있게 해주는 명령어
// 프론트와 백이 서로 다른 주소에서 통신해야 함
const cors = require("cors"); // cors(Cross Origin Resource Sharing) 세팅
const app = express(); // 앱 객체 생성
app.use(cors()); // 어떤 주소든 접근 가능

// DB 연결 시도, User같은 DB 관련 객체 정의
// mongoose.connect() -> 연결 시작 역할
mongoose
  .connect(process.env.MONGODB_URI) // 프로미스 객체 반환
  .then(() => console.log("connected to database"))
  .catch((error) => console.log(error)); // 에러 처리

module.exports = app;
