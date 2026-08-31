# im-books-front

송누리의 이력서와 프로젝트를 소개하는 개인 웹사이트입니다. 공개 포트폴리오는 Next.js
정적 앱으로, 소유자 인증이 필요한 인쇄 화면은 SvelteKit 앱으로 운영합니다.

## 주요 화면

| 경로                 | 설명                      |
| -------------------- | ------------------------- | -------------------------------------------------- |
| 앱                   | 경로                      | 설명                                               |
| -------------------- | ------------------------- | -------------------------------------------------- |
| Next.js 포트폴리오   | `/`, `/portfolio`         | 프로젝트의 문제·해결·성과를 정리한 공개 화면       |
| Next.js 포트폴리오   | `/portfolio/project/[id]` | 개별 프로젝트 상세 내용                            |
| SvelteKit 인쇄 문서  | `/print`                  | 인쇄 이력서의 색상 설정 및 PDF 저장                |
| SvelteKit 인쇄 문서  | `/print/[company]`        | 지원 회사 요구사항에 맞춘 이력서·포트폴리오 프로필 |

## 기술 스택

- Next.js App Router, React, TypeScript strict mode, 정적 내보내기
- SvelteKit, Svelte 5 runes, Vite, `@sveltejs/adapter-auto`
- Vitest
- ESLint, Prettier, `prettier-plugin-svelte`
- pnpm

## 시작하기

Node.js 22 이상과 pnpm 10 이상이 필요합니다.

```bash
pnpm install
pnpm dev:portfolio
```

인쇄 문서 앱은 `pnpm dev`로 실행합니다.

### 소유자 인쇄 문서

`/print`와 `/print/[company]`는 소유자 인증 쿠키로 보호됩니다. 로컬에서는 `.env.example`을
복사한 `.env`에 다음 private 환경변수를 설정합니다.

- `OWNER_PASSWORD`: 소유자 로그인 비밀번호
- `OWNER_SESSION_SECRET`: `openssl rand -hex 32`로 생성한 쿠키 서명값

환경변수 이름에 `PUBLIC_` 접두사를 붙이지 마세요. 인증 후 8시간 동안 데스크톱 GNB에만
`PDF` 메뉴가 표시됩니다.

## 명령어

| 명령어                 | 용도                               |
| ---------------------- | ---------------------------------- |
| `pnpm dev:portfolio`   | Next.js 포트폴리오 개발 서버 실행  |
| `pnpm build:portfolio` | 정적 포트폴리오를 `out/`에 생성    |
| `pnpm check:portfolio` | 포트폴리오 TypeScript 검사         |
| `pnpm dev`             | SvelteKit 인쇄 문서 개발 서버 실행 |
| `pnpm build`           | SvelteKit 인쇄 문서 빌드           |
| `pnpm check`           | Svelte 및 TypeScript 타입 검사     |
| `pnpm lint`            | Prettier와 ESLint 검사             |

## 프로젝트 구조

```text
apps/portfolio/             # Next.js 공개 포트폴리오
├── src/app/                # App Router 페이지와 전역 스타일
├── src/components/         # 포트폴리오 인터랙션 컴포넌트
└── src/data/               # 공개 경력·프로젝트 데이터
src/                        # SvelteKit 소유자 인쇄 문서
├── lib/
│   ├── actions/       # 재사용 가능한 Svelte 액션
│   ├── components/    # 포트폴리오 및 인쇄용 컴포넌트
│   ├── data/          # 프로젝트 데이터
│   ├── portfolio/     # 포트폴리오 콘텐츠와 시각화 설정
│   ├── stores/        # 테마 상태와 관련 테스트
│   └── styles/        # 공유 스타일
└── routes/            # SvelteKit 파일 기반 라우트
static/                # URL로 직접 제공되는 정적 파일
docs/                  # 디자인 결정 및 구현 계획
rules/                 # 코드와 컴포넌트 작성 규칙
```

공유 코드는 `$lib` 별칭으로 가져옵니다. 테스트는 대상 코드와 같은 디렉터리에
`*.spec.ts` 또는 `*.test.ts` 이름으로 둡니다. 기여 시 세부 규칙은
[AGENTS.md](AGENTS.md)를 확인하세요.

## 라이선스

[MIT](LICENSE)
