const userController = require("../Controllers/userController");

// 통신 관련 함수들
// 여러 개의 함수를 감싸는 하나의 큰 함수를 내보내기
module.exports = function (io) {
  // io ~~~~ 함수들의 집합!

  // 듣는 함수 .on()
  // 나한테 말 걸 사람????
  // async => 연결되면 연결된 사람의 정보를 매개변수로 보내줌
  io.on("connection", async (socket) => {
    console.log("connected to socket", socket.id);

    // 프론트에서 "login"으로 소켓 보낸 거 받기,
    socket.on("login", async (userName, callback) => {
      // db랑 연결하기 위해 비동기 함수로 작성
      try {
        // 로그인 요청이 오면 userSchema에 저장할 것..
        // userName 있고, socketid 있으니 db에 저장할 수 있음!

        // 유저 정보를 저장하는 함수 => 통신과 관련 없어서 따로 뺌
        const user = await userController.saveUser(userName, socket.id);
        callback({ ok: true, data: user }); // 응답 값 설정, 프론트로 보낼 것
      } catch (error) {
        callback({ ok: false, error: error.message });
      }
      // {ok: false, error: 'Operation `users.findOne()` buffering timed out after 10000ms'} => DB 연결도 전에 findOne해서 오류남; => 그래서 서버 열기 전에 비동기로 DB 연결되는 거 기다려주는 로직 index.js에 짜놓음
    });

    // 연결이 끊기는 경우
    socket.on("disconnect", () => {
      console.log("disconnected socket");
    });
  });

  // 말하는 함수 .emit()
};
