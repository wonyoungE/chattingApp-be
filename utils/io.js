// 통신 관련 함수들
// 여러 개의 함수를 감싸는 하나의 큰 함수를 내보내기
module.exports = function (io) {
  // io ~~~~ 함수들의 집합!

  // 듣는 함수 .on()
  // 나한테 말 걸 사람????
  // async => 연결되면 연결된 사람의 정보를 매개변수로 보내줌
  io.on("connection", async (socket) => {
    console.log("나 연결됐옹", socket.id);

    // 연결이 끊기는 경우
    socket.on("disconnect", () => {
      console.log("연결 끊겼음 ㅠㅠ");
    });
  });

  // 말하는 함수 .emit()
};
