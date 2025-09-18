# <img src="src/assets/logo.png" alt="단짝이 로고" height="28" /> 단짝이

아이와 보호자가 함께 쓰는 혈당 생활 코치.  
식사/활동 퀘스트, 혈당 예측 카드, 리포트로 ‘하루 혈당 루틴’을 쉽게 만들어요.

<img src="public/frame.png" alt="단짝이 대표사진" height="100" />

## 1) 핵심 기술 스택
- **FE**: React 18, Vite, React Router, Tailwind CSS, Recharts, react-hook-form + Yup, Lottie
- **State/유틸**: date-fns
- **Build/품질**: ESLint  
- **BE 연동**: REST API (`/analyze` 등), Vite dev proxy

> 선택 이유: 빠른 개발(Vite), 컴포넌트화(React), 일관된 UI(Tailwind), 폼/검증 안정성(react-hook-form+Yup), 시각화(echarts)

## 2) 주요 기능
- **온보딩 & 멀티스텝 회원가입**: 이메일/비번 검증, 생년월일·기기 선택(Dexcom/Libre/케어센스)
- **홈**: 주간 캘린더, 오늘의 혈당카드, 퀘스트 바로가기
- **퀘스트**: 사진 인증(식단/활동), 메뉴 확인(예: 치킨/피자 750kcal 버튼), 보상 포인트
- **리포트**: 평균/최고 혈당, 스파이크(+mg/dL) 카드, 그래프
- **접근성**: 키보드 포커스, 의미 있는 `aria-*`, 충분한 대비
- **에러 핸들링**: API 실패 시 사용자 메시지 + 재시도 버튼

## 3) 설치 & 실행
### 요구 사항
- Node.js ≥ 18
- pnpm/npm/yarn 중 택1

```bash
# 1) 설치
pnpm i

# 2) 환경변수
cp .env.example .env
# 예시
# VITE_API_BASE_URL=https://<your-backend-host>

# 3) 개발 서버
pnpm dev

# 4) 프로덕션 빌드 & 미리보기
pnpm build
pnpm preview
