# im-books-front

송누리의 이력서와 프로젝트를 소개하는 개인 웹사이트입니다. 인터랙티브 포트폴리오,
프로젝트 상세 화면, 인쇄 및 PDF 저장에 최적화된 이력서 화면을 제공합니다. 루트 경로(`/`)는
`/portfolio`로 이동합니다.

## 주요 화면

| 경로                      | 설명                                               |
| ------------------------- | -------------------------------------------------- |
| `/portfolio`              | 프로젝트의 문제·해결·성과를 정리한 웹 포트폴리오   |
| `/portfolio/project/[id]` | 개별 프로젝트 상세 내용                            |
| `/print`                  | 인쇄 이력서의 색상 설정 및 PDF 저장                |
| `/print/[company]`        | 지원 회사 요구사항에 맞춘 이력서·포트폴리오 프로필 |

## 기술 스택

- SvelteKit, Svelte 5 runes, TypeScript strict mode
- Vite, `@sveltejs/adapter-auto`
- Vitest
- ESLint, Prettier, `prettier-plugin-svelte`
- pnpm

## 시작하기

Node.js 22 이상과 pnpm 10 이상이 필요합니다.

```bash
pnpm install
pnpm dev
```

개발 서버가 실행되면 브라우저가 자동으로 열립니다.

### 소유자 인쇄 문서

`/print`와 `/print/[company]`는 소유자 인증 쿠키로 보호됩니다. 로컬에서는 `.env.example`을
복사한 `.env`에 다음 private 환경변수를 설정합니다.

- `OWNER_PASSWORD`: 소유자 로그인 비밀번호
- `OWNER_SESSION_SECRET`: `openssl rand -hex 32`로 생성한 쿠키 서명값

환경변수 이름에 `PUBLIC_` 접두사를 붙이지 마세요. 인증 후 8시간 동안 데스크톱 GNB에만
`PDF` 메뉴가 표시됩니다.

## 명령어

| 명령어           | 용도                           |
| ---------------- | ------------------------------ |
| `pnpm dev`       | 개발 서버 실행                 |
| `pnpm build`     | 프로덕션 빌드 생성             |
| `pnpm preview`   | 빌드 결과 로컬 확인            |
| `pnpm check`     | Svelte 및 TypeScript 타입 검사 |
| `pnpm lint`      | Prettier와 ESLint 검사         |
| `pnpm format`    | Prettier로 파일 정리           |
| `pnpm test`      | Vitest 전체 테스트 1회 실행    |
| `pnpm test:unit` | Vitest 감시 모드 실행          |

## 프로젝트 구조

```text
src/
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
