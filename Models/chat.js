const mongoose = require("mongoose");

// 채팅 스키마
const chatSchema = new mongoose.Schema(
  {
    chat: String,
    user: {
      id: {
        // MongoDB는 NoSQL이라 FK 개념은 존재하지 않고, 연결 관계를 구현한 것
        type: mongoose.Schema.ObjectId, // MongoDB의 _id 값을 저장하는 필드라는 뜻
        ref: "User", // User 컬렉션의 문서를 참조한다는 뜻
      },
      name: String,
    },
  },
  { timestamp: true } // Mongoose가 createdAt, updatedAt 필드 자동 추가해줌
);

module.exports = mongoose.model("Chat", chatSchema);
