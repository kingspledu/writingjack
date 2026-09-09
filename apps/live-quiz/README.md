# Live Quiz

1:1 또는 소규모 온라인 수업용 실시간 퀴즈입니다. GitHub Pages에서 화면을 제공하고 Firebase Authentication + Realtime Database 무료 요금제를 실시간 연결에 사용합니다.

## 처음 한 번 설정

1. https://console.firebase.google.com 에서 프로젝트를 만듭니다.
2. **Build > Authentication > Sign-in method**에서 `Anonymous` 로그인을 켭니다.
3. **Build > Realtime Database**를 만들고 위치를 선택합니다.
4. Realtime Database의 **Rules** 탭에 `database.rules.json` 내용을 붙여넣고 게시합니다.
5. **Project settings > Your apps > Web app**에서 앱을 등록하고 표시된 값을 `firebase-config.js`에 입력합니다.
6. 이 폴더를 GitHub Pages로 배포합니다.

현재 저장소가 `kingspledu/writingjack`이고 Pages가 main 브랜치에서 자동 배포된다면 주소는 다음과 같습니다.

- 학생: `https://kingspledu.github.io/writingjack/apps/live-quiz/`
- 선생님: `https://kingspledu.github.io/writingjack/apps/live-quiz/?role=teacher`

## JSON 형식

`answer`는 정답 번호이며 0부터 셉니다. 즉 첫 번째 보기는 0, 두 번째 보기는 1입니다.

```json
{
  "title": "퀴즈 제목",
  "questions": [
    {
      "question": "문제",
      "choices": ["보기 1", "보기 2", "보기 3", "보기 4"],
      "answer": 0,
      "timeLimit": 20
    }
  ]
}
```

## 운영 참고

- 방 코드는 매번 무작위 5자리 숫자로 만들어집니다.
- 학생 답변은 한 문제당 한 번만 제출됩니다.
- 정답과 응답 속도에 따라 500~1000점을 받습니다.
- Firebase Spark 무료 요금제 한도 안에서는 별도 서버 비용 없이 소규모 수업에 충분합니다.
- 현재 규칙은 수업용 간편 운영을 우선한 MVP 규칙입니다. 공개 대규모 서비스로 확장할 때는 Cloud Functions를 통한 점수 검증과 관리자 인증을 추가하세요.
