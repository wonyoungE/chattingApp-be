const userController = require("../Controllers/userController");
const chatController = require("../Controllers/chatController");

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

        // 누구 님이 입장했습니다 => 시스템 메세지
        const welcomeMessage = {
          chat: `${user.name} is joined to this room`,
          user: { id: null, name: "system" }, // 백엔드가 날리는 메세지, userid없음
        };
        // 해당 서버의 모든 클라이언트에게 알려주면 됨
        io.emit("message", welcomeMessage);

        callback({ ok: true, data: user }); // 응답 값 설정, 프론트로 보낼 것
      } catch (error) {
        callback({ ok: false, error: error.message });
      }
      // {ok: false, error: 'Operation `users.findOne()` buffering timed out after 10000ms'} => DB 연결도 전에 findOne해서 오류남; => 그래서 서버 열기 전에 비동기로 DB 연결되는 거 기다려주는 로직 index.js에 짜놓음
    });

    // 프론트에서 보낸 채팅 메세지 받기(듣기)
    socket.on("sendMessage", async (message, callback) => {
      try {
        // 메세지 받으면? 저장해야지
        // socket id로 유저 찾기
        const user = await userController.checkUser(socket.id);

        // 메세지 저장
        const newMessage = await chatController.saveChat(message, user);
        // 로그인이랑 다르게 메세지 받는 건 콜백만으로는 안됨
        // => 콜백은 메세지 보낸 클라이언트한테 다시 보내주는건데?? 그럼 채팅을 받는 사람이 없잖음

        // 조금 다르게 생각해야됨
        // 채팅 = 클라이언트가 2명 이상
        // A유저(클라이언트)가 백엔드 서버에 메세지를 보냄 -> 저장
        // 그 메세지는 다른 유저들(클라이언트)한테 보내야함
        // 어떻게? 해당 서버에 접속한 클라이언트 "모두"에게 뿌리기
        io.emit("message", newMessage);
        callback({ ok: true });
      } catch (error) {
        callback({ ok: false, error: error.message });
      }
    });

    // 연결이 끊기는 경우
    socket.on("disconnect", () => {
      console.log("user is disconnected");
    });
  });

  // 말하는 함수 .emit()
};
