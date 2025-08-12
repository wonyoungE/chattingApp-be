const mongoose = require("mongoose");

// 스키마 설계
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must type name"],
    unique: true,
  },
  token: {
    // 연결 ID정보
    type: String,
  },
  online: {
    type: Boolean,
    default: false,
  },
});

// module.exports 하면 다른 파일에서 require() 함수로 불러와서 사용 가능
// node.js의 기본 모듈 시스템
// 스키마(Schema)를 바탕으로 모델(Model)을 생성하고 내보내기
module.exports = mongoose.model("User", userSchema);
