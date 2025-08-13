const Chat = require("../Models/chat");
const chatController = {};

// 메세지 저장하는 함수
chatController.saveChat = async (message, user) => {
  // 메세지 객체 생성
  const newMessage = new Chat({
    chat: message,
    user: {
      id: user._id, // _id는 mongoDB가 부여한 번호
      name: user.name,
    },
  });
  await newMessage.save();
  return newMessage;
};

module.exports = chatController;
