// 웹소켓 세팅

// Node.js의 http 모듈로 HTTP 서버 띄우기
// 그 위에 Express로 일반적인 웹 기능 만듦
// socket.io를 사용해 실시간 채팅 기능 위한 통신 채널 만들기
// Express랑 웹소켓 둘 다 MongoDB에 연결해서 채팅 데이터 저장하고 불러옴

// js의 구조 분해, http 모듈 중에서 createServer만 뽑아오기
// 이렇게 하지 않으면
// const http = require("http");
// const createServer = http.createServer;
const { createServer } = require("http"); // Node.js의 http 모듈을 가져오는 코드
const app = require("./app");
const { Server } = require("socket.io");
require("dotenv").config();

// Express로 만든 앱(app)을 httpServer에 합쳐서 HTTP 서버 만들기
const httpServer = createServer(app);
// socket.io 서버를 얹어서 HTTP 서버와 웹소켓 서버 한 번에 실행할 수 있게 만들기
const io = new Server(httpServer, {
  // 웹소켓 서버 만들기
  cors: {
    // 이 주소로부터의 요청은 접근 가능
    origin: "http://localhost:3000", // 프론트 주소
  },
});

// require("./utils/io") => io.js 파일에 접근해서 module.exprts로 내보낸 값 가져오기
// 내보내진 값 = 함수, io 객체를 인수로 넣어서 바로 실행해버리기
require("./utils/io")(io);

httpServer.listen(process.env.PORT, () => {
  console.log("server listening on port", process.env.PORT);
});
