// User
const User = require("../Models/users");
// userController 객체 생성
const userController = {};

// 객체에 saveUser 함수 정의
// 객체 저장하므로 비동기
userController.saveUser = async (userName, socketId) => {
  // 재방문 유저의 경우 유저 정보를 새로 만들지 않음

  // 모델에서 해당 유저 찾기
  //
  let user = await User.findOne({ name: userName });
  // 유저 정보가 없다면 객체 생성
  if (!user) {
    user = new User({
      name: userName,
      token: socketId,
      online: true,
    });
  }
  // 이미 있는 유저라면 연결 정보 token값 바꾸기
  user.token = socketId;
  user.online = true;

  // 정보 저장
  await user.save();
  // 생성된 객체 return
  return user;
};

// 유저 찾는 함수
userController.checkUser = async (socketId) => {
  const user = await User.findOne({ token: socketId });
  if (!user) {
    throw new Error("user not fonud");
  }
  return user;
};

// userController 객체 자체를 내보내기
// 다른 파일에서 require로 userController 가져다 쓸 수 있음
// 모듈화
module.exports = userController;
