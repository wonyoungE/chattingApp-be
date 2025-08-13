const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    room: String,
    members: [
      {
        type: mongoose.Schema.ObjectId,
        // unique: true,
        // 두 가지 상황의 차이
        // 배열 전체에 unique: true: 이 경우에는 members: []처럼 빈 배열을 가진 문서를 두 개 이상 저장할 수 없어. 그래서 js 단톡방을 넣고 리액트 단톡방을 넣으려 할 때 E11000 에러가 난 거야
        // 배열 안의 요소에 unique: true: 네가 강의에서 본 코드처럼, members 배열 **안에 있는 ObjectId**에 unique: true를 적용하면 아주 올바른 설정이 돼. 이건 한 사람이 같은 방에 두 번 들어가지 못하도록 막아주는 유용한 기능이거든.
        ref: "User",
      },
    ],
  },
  { timestamp: true }
);
module.exports = mongoose.model("Room", roomSchema);
