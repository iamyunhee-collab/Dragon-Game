# 버크 드래곤 도감

드래곤 길들이기 드래곤 퀴즈 · 월드컵 · 뽑기 · 전투 · 미니게임 웹앱.

- 구글 로그인 + 관리자 승인제로 운영해요. 승인된 멤버만 내용을 볼 수 있어요.
- 데이터는 Firebase Firestore에 저장되고, 접근은 Firestore 보안 규칙이 막아요.
  (보안 규칙과 사진, 게임 기록은 이 저장소에 없어요.)
- `config.js`의 Firebase 설정값은 원래 공개되는 값이에요.
- `vendor/`: Firebase JS SDK 10.12.2 (compat), Matter.js 0.19.0 — 외부 CDN 없이 직접 제공해요.
