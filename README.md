# <img src="src/assets/logo.png" alt="단짝이 로고" height="28" /> 단짝이

아이와 보호자가 함께 쓰는 혈당 생활 코치!
식사/활동 퀘스트, 혈당 예측 카드, 리포트로 ‘하루 혈당 루틴’을 쉽게 만들어요.
<br>
<br>
<img src="public/Frame.png" alt="단짝이 대표사진" />

## 1) 핵심 기술 스택
- **FE**: React 18, Vite, React Router, Tailwind CSS, Recharts, react-hook-form + Yup, Lottie
- **State/유틸**: date-fns (날짜 선택 컴포넌트에 활용)
- **Build/품질**: ESLint  
- **BE 연동**: REST API (`/analyze` 등), Vite dev proxy, LLM

> 선택 이유: 빠른 개발(Vite), 컴포넌트화(React), 일관된 UI(Tailwind), 폼/검증 안정성(react-hook-form+Yup), 그래프 시각화(echarts)

## 2) 주요 기능
- **온보딩 & 멀티스텝 회원가입**: 이메일/비번 검증, 생년월일·기기 선택(Dexcom/Libre/케어센스)
- **홈**: 주간 캘린더, 오늘의 혈당카드, 퀘스트 바로가기
- **퀘스트**: 사진 인증(식단/활동), 메뉴 확인(예: 치킨 750kcal 버튼)
- **리포트**: 평균/최고 혈당, 스파이크(+mg/dL) 카드, 그래프
- **접근성**: 키보드 포커스, 의미 있는 `aria-*`, 충분한 대비와 아이 맞춤형 UI
- **에러 핸들링**: API 호출 실패 시 사용자 메시지 + 재시도 버튼

## 3) 사용 방법

1. **아이 버전**
   - **1.1** 가입 → 이메일/비밀번호 입력(실시간 유효성 검증) 후 기본 정보 입력
   - **1.2** 기기 선택 → Dexcom/Libre/케어센스 중 택1
   - **1.3** 로그인 → 이메일/비밀번호 입력(실시간 유효성 검증)
   - **1.4** 홈 → 현재 수치, 하루 혈당 추이 확인
   - **1.5** 퀘스트 → 수치를 기반으로 생성되는 퀘스트 확인  
     - **1.5.1** 음식 기록 퀘스트 → 퀘스트 인증하기 → 입력 후 혈당 예측 확인
   - **1.6** 리포트 → 주간 리포트 확인 → 금주의 배지 확인

2. **부모(보호자) 버전**
   - **2.1** 아이 코드로 로그인 → 발급받은 아이 코드 입력
   - **2.2** 홈 → 혈당건강지수, 그래프 추이, 일 단위 혈당 리포트  
     - **2.2.1** 그래프 클릭 시 시간별 리포트 확인 가능
   - **2.3** 퀘스트 → 아이가 인증한 퀘스트 확인
   - **2.4** 리포트 → 주간 리포트(AI 요약, 주간 그래프, 일일 그래프, 음식/운동 분석 등) 확인

## 4) 프로젝트 구조
```text
public/
└─ logo.png               # 어플 로고 png
src/
├─ assets/                # 이미지, 아이콘, lottie 등
├─ components/
│  ├─ charts/Chart.jsx    # 리포트 차트 컴포넌트
│  └─ TabBar/             # 하단 네비게이션 바 컴포넌트
├─ screens/
│  ├─ kid/                # 아이 버전 화면
│  │  ├─ Home_kid.jsx
│  │  ├─ QuestPage.jsx
│  │  ├─ QuestUpdatePage.jsx
│  │  ├─ QuestCheckPage.jsx
│  │  ├─ Report_kid.jsx
│  │  ├─ Badge.jsx
│  │  └─ My.jsx
│  ├─ parents/            # 부모(보호자) 버전 화면  
│  │  ├─ Home_parents.jsx
│  │  ├─ Quest_parents.jsx
│  │  ├─ Quest_detail.jsx
│  │  ├─ ReportPage.jsx
│  │  └─ Report_parents.jsx
│  └─ steps/             # Signup 단계별 페이지 (0~7)
│  ├─ styles/            # 전역/페이지별 CSS
│  │  ├─ Signup.css.jsx
│  │  ├─ Signup_2.css
│  │  ├─ Signup_3.
│  │  ├─ Signup_4.
│  │  └─ Signup_7.
├─ InitialOnboarding.jsx  # 스플래쉬~온보딩 연결
├─ Login.jsx
├─ SignUp_for_parents.jsx # 아이코드로 로그인
├─ Signup_success.jsx
├─ App.jsx
├─ App.css
└─ main.jsx
```

## 5) 확장 계획
- **멀티스텝 회원가입 화면 단축 → Signup Wizard 생성**
  <br>여러 페이지로 나뉜 가입 과정을 하나의 화면에서 “다음/이전”으로 진행하는 마법사(Wizard) 형태로 통합합니다.
  <br>이로써 **하나의 폼 상태**를 공유하고, 현재 단계만 검증하며, **공통 레이아웃**을 재사용하고자 합니다.
- **B2G, B2B & 아동 친화적 UI 인사이트 수집**
  <br>**학교·보건기관과의 파트너십(B2B/B2G)** 을 통해 배포 범위를 넓히고, 아이들이 쉽게 쓰고 흥미를 느끼는 UI를 만들기 위해 **데이터 기반 인사이트를 수집·반영**합니다.
