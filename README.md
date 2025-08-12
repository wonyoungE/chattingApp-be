1. 백엔드 세팅: DB 세팅, 웹소켓 세팅
2. 프론트엔드 세팅 : 웹소켓 세팅
3. 백 - 프론트 연결 테스트
4. 유저 로그인
5. 메세지 주고받기

// 라이브러리
express → 서버 프레임워크, API 라우팅
mongoose → MongoDB ODM
cors → CORS 설정
dotenv → 환경변수 관리 패키지
http → 기본 Node.js http 모듈 (npm 설치 없이 Node.js에 내장돼 있음, 사실 안 깔아도 됨)
socket.io → 실시간 양방향 통신, 브라우저<->서버 간 메시지 전송, 특정 방 기능 지원
nodemon → 파일에 변화 생기면 서버를 자동으로 재시작

// 구조
[클라이언트 브라우저]
│ (채팅 메시지 입력)
▼
[Socket.IO Client] ──────▶ [Express 서버 + Socket.IO]
▲ │
│ (서버에서 보낸 메시지) │
└─────────────────────────┘
│
▼
[MongoDB (Mongoose)] - User 컬렉션 - Chat 컬렉션

// Node.js 서버 실행 방법 → node 파일명
// 코드 수정하면 서버 재시작해야함
// nodemon.js 쓰면 파일 저장할 때마다 서버 재시작해줌
