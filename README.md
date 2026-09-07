# Writing Jack

제공된 노션 스크린샷을 바탕으로 만든 정적 학습 자료실입니다. index.html을 열면 됩니다.

- index.html: 교재별 목차
- unit.html: 공통 Unit 상세 화면
- content.js: 교재, Unit, 영상, PDF, 활동별 앱 정보
- writing.js / writing.css: 화면 표시와 디자인
- apps/: 독립 웹앱 코드 저장 위치

이전 초안의 apps.js, main.js, styles.css는 로컬에만 보관하며 배포에서 제외합니다.

## 반영한 자료
Great Writing Foundations Unit 1·2, Great Writing 1 Unit 1·2·3, Bricks Vocabulary 3900 목차를 반영했습니다. Foundations Unit 1에는 스크린샷의 영상 2개, PDF 3개, Activity 1~17과 원본의 translation/quiz 활동 자리를 만들었습니다. 원본 파일과 앱은 아직 없어 준비 중 상태입니다. 영상과 PDF 이름은 공개 노션 원본의 실제 파일명을 사용합니다.

GREAT WRITING 배너는 CSS와 텍스트로 만든 임시 표지입니다. 원본 표지를 받으면 교체할 수 있습니다. bit.ly/writingjack은 기존 화면의 제목이며 단축 URL 목적지를 변경한 것은 아닙니다. 노션 관리자용 게시 배너는 포함하지 않았습니다.

## 앱 연결
앱을 apps/foundations/unit-1/activity-1/index.html에 저장한 후 content.js의 해당 resources 항목 url을 './apps/foundations/unit-1/activity-1/index.html'로 바꿉니다.
url이 null이면 준비 중, 유효한 주소가 있으면 클릭 가능한 카드로 표시됩니다.
앱은 독립 페이지에서 실행하므로 스타일과 스크립트가 충돌하지 않습니다. Unit은 content.js에 추가하면 공통 상세 화면으로 표시됩니다.

PDF는 files 항목의 url에 './materials/파일명.pdf' 등을 입력합니다. 영상은 videos 항목 url에 직접 재생 가능한 영상 파일 주소를 넣습니다. YouTube 등 서비스 페이지는 type: 'link'와 url을 설정하면 영상 링크로 표시됩니다. 대용량 영상 저장 위치는 자료를 받은 뒤 정합니다.

## 다음 단계
1. 첫 앱 코드를 받아 해당 Unit의 Activity에 연결
2. 앱의 이미지, 외부 라이브러리, 저장 방식, 모바일 동작 확인
3. 같은 폴더 규칙으로 나머지 앱 이전
4. 영상과 PDF 원본 또는 공유 주소 연결
5. GitHub 저장소와 호스팅 주소 확정 후 Pages 배포

React 등은 코드를 받은 후 필요한 빌드 설정을 적용합니다. 비밀 API 키가 필요한 앱은 공개 정적 파일에 키를 넣지 않고 서버 구성을 결정합니다.
배포 시 이 폴더 내용이 저장소 루트에 위치하도록 구성합니다. 내부 경로는 상대 경로입니다. GitHub Pages: https://kingspledu.github.io/writingjack/ — main 브랜치에 푸시하면 자동 배포됩니다.
