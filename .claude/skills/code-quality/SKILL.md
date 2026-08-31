---
name: code-quality
description: 이 저장소의 React/TypeScript 코드를 새로 쓰거나 고치거나 리뷰할 때 항상 참조한다. "변경하기 쉬운 코드"를 기준으로 가독성·예측 가능성·응집도·결합도를 판단하고, 추상화·공통화 여부와 선언 레벨을 고른다. 컴포넌트 분리, 서버·클라이언트 경계, 훅 설계, 중복 제거 여부를 고민할 때 특히 사용한다.
---

# 코드 품질 기준

토스 프론트엔드 챕터의 기준(Frontend Fundamentals)을 이 저장소에 맞춰 정리한 것.

**기계적으로 검증 가능한 항목은 이미 `eslint.config.js`에 규칙으로 들어가 있다.**
(중첩 삼항, yoda 비교, `complexity`, `max-depth`, `max-params`, `no-shadow`)
이 문서는 **린터가 판단할 수 없는 부분**만 다룬다.

---

## 0. 제1원칙 — 좋은 코드 = 변경하기 쉬운 코드

판단 기준은 "아름다움"이 아니라 **변경 비용**이다.
새 요구사항이 왔을 때 수정하고 배포하기 수월한가?

```
변경하기 쉬운가?
├─ 가독성        읽고 이해할 수 있는가
├─ 예측 가능성    이름만 보고 동작을 알 수 있는가
├─ 응집도        같이 바뀔 코드가 같이 바뀌게 되어 있는가
└─ 결합도        수정했을 때 영향 범위가 좁고 예측되는가
```

아래 4가지 기준도, 선언적 코드 여부도 모두 이 원칙에 종속된다.

---

## 1. 선언 레벨 고르기

선언적인 코드 = **추상화 레벨이 높아진 코드**. "선언형 vs 명령형"의 이분법이 아니라
연속선이며, 어느 레벨에서 보느냐의 문제다.

```ts
// 낮음 — 제어 흐름이 드러난다
let result = 0;
for (const num of nums) result += num;

// 높음 — 동작만 드러난다
sum(nums);
```

### 선언적 코드가 항상 좋은 건 아니다

```tsx
// 잘 된 추상화 — 인터페이스가 좁고, 한 곳만 바꾸면 전파된다
<SignUpForm onSubmit={(result) => { /* ... */ }} />

// 무너진 추상화 — 화면마다 조금씩 달라서 prop이 폭발한다
<SignUpForm
  signUpOrder={['sns', 'normal']}
  title="..." subtitle="..."
  primaryButtonColor={...} secondaryButtonColor={...}
  onCancel={...} onSubmit={...}
/>
```

**판단 기준: 추상화의 목적은 재사용이 아니라 변경 비용 절감이다.**
요구사항이 앞으로 어떻게 바뀔지 예측하고 그에 맞는 선언 레벨을 고른다.

---

## 2. 가독성 — 한 번에 들고 있어야 하는 맥락 줄이기

사람이 동시에 고려할 수 있는 맥락은 대략 **6~7개**. 그 이상이면 쪼개거나 추상화한다.

### 같이 실행되지 않는 코드는 분리한다

분기 때문에 동시에 실행될 수 없는 코드가 한 컴포넌트에 섞이면 두 흐름을 동시에 추적해야 한다.

```tsx
<!-- Before — 두 역할의 로직이 교차한다 -->
<script lang="ts">
	const isViewer = $derived(role.value === 'viewer');
	$effect(() => {
		if (isViewer) return;
		showAnimation();
	});
</script>

{#if isViewer}
	<TextButton disabled>Submit</TextButton>
{:else}
	<Button type="submit">Submit</Button>
{/if}

<!-- After — 분기를 한 지점으로 모으고, 각 컴포넌트는 하나의 흐름만 갖는다 -->
{#if isViewer}<ViewerSubmitButton />{:else}<AdminSubmitButton />{/if}
```

### 구현 상세는 감싼다

로그인 여부 검사, 권한 체크 같은 상세가 화면 코드에 드러나면 "이 화면이 무엇을 하는지"가 묻힌다.
래퍼 컴포넌트나 `layout.tsx` / `proxy.ts`로 옮긴다.

### 이름을 붙인다

```ts
// Before — 조건의 의미를 독자가 역산해야 한다
if (user.role === 'admin' && !user.suspended && user.emailVerified) {
}

// After
const canManageTeam = user.role === 'admin' && !user.suspended && user.emailVerified;
if (canManageTeam) {
}
```

매직 넘버도 마찬가지다. **린터로는 "함께 바뀌어야 하는 숫자"와 "그냥 숫자"를 구분할 수 없으니
여기서 판단한다.** 다른 값과 연동돼 바뀌어야 하는 숫자는 반드시 상수를 공유시킨다.

```ts
await delay(300); // 300이 무엇인지 알 수 없다
const ANIMATION_DELAY_MS = 300; // 애니메이션과 함께 바뀌어야 함이 드러난다
await delay(ANIMATION_DELAY_MS);
```

### 시점 이동을 줄인다

조건을 이해하려고 파일과 함수를 오르내리게 만들지 않는다.
정책 객체나 분기 로직이 여러 파일에 흩어져 있으면 시점 이동이 늘어난다.

---

## 3. 예측 가능성 — 이름만 보고 동작을 알 수 있는가

### 이름이 겹치지 않게

라이브러리와 같은 이름의 래퍼(`fetch`, `http`)를 만들고 그 안에 토큰 주입 같은 추가 동작을 넣으면,
읽는 사람은 원본 동작을 기대한다. 다른 동작이면 다른 이름(`httpWithAuth`)을 쓴다.

### 같은 계열은 반환 타입을 통일한다

```ts
// Before — 같은 계열인데 하나는 query 객체를, 하나는 값을 반환한다
export function useUser() { return useQuery(...); }
export function useServerTime() { const { data } = useQuery(...); return data; }

// After — 같은 계열은 같은 형태로
export function useUser() { return useQuery(...); }
export function useServerTime() { return useQuery(...); }
```

검증 함수처럼 여러 곳에 흩어지는 유틸도 반환 형태를 하나로 맞춘다.
(`boolean`만 반환하거나, `{ ok, reason }`만 반환하거나 — 섞지 않는다.)

### 숨은 로직을 드러낸다

```ts
// Before — 이름에 없는 부수 효과가 숨어 있다
async function fetchBalance(): Promise<number> {
	const balance = await http.get('/balance');
	logging.log('balance_fetched'); // ← 이름만 보면 알 수 없다
	return balance;
}

// After — 부수 효과는 호출하는 쪽에서 명시적으로
const balance = await fetchBalance();
logging.log('balance_fetched');
```

**함수 이름이 약속하지 않은 일(로깅·저장·이동)은 함수 안에서 하지 않는다.**

---

## 4. 응집도 — 같이 바뀔 코드가 같이 바뀌는가

응집도가 낮으면 한쪽만 고치고 다른 쪽을 놓쳐 버그가 난다.

### 함께 수정되는 파일을 같은 디렉토리에 둔다

종류별(`hooks/`, `utils/`, `components/`)로만 나누면 한 기능을 고칠 때 여러 폴더를 오간다.
**기능/도메인 단위로 묶고, 그 안에서 파일을 나눈다.**

```
src/
  components/print/   ← 인쇄 문서 컴포넌트
  data/print-profile.ts
  styles/resume-print.css
```

> 이 저장소의 현재 상태: 인쇄 문서의 컴포넌트·데이터·스타일이 세 디렉토리로 갈라져 있다.
> 같이 바뀌는 파일들이므로 손댈 일이 생기면 합치는 방향으로 간다.

### 함께 바뀌는 값은 하나의 상수를 공유한다

같은 원본에서 파생되는 값을 여러 곳에서 따로 계산하지 않는다.

```tsx
// Before — variant → id 매핑과 variant → title 매핑이 따로 있다
const currentDoc = /* variant 분기 */;
const documentTitle = /* 같은 variant 분기를 또 */;

// After — 같이 바뀌므로 한 곳에서 함께 결정한다
function resolveDocument(): { id: string; title: string } {
  if (targetResume) return { id: 'target', title: `${targetResume.label} 이력서` };
  if (variant === 'career') return { id: 'career', title: '경력기술서' };
  return { id: 'resume', title: '이력서' };
}
const currentDocument = resolveDocument();
```

### 폼의 응집 단위를 의식적으로 고른다

- **필드 단위 응집**: 필드별 검증 → 재사용·독립 변경에 유리
- **폼 전체 응집**: 스키마 한 곳에 검증을 모음 → 폼이 통째로 바뀔 때 유리

정답은 없고, **함께 바뀌는 범위에 맞춰** 고른다.

---

## 5. 결합도 — 수정했을 때 영향 범위가 좁은가

### 책임을 하나씩 관리한다

여러 관심사를 담은 훅은 한 관심사만 필요한 화면까지 전부 묶어버린다.

```ts
// Before — 이 훅을 쓰는 모든 화면이 모든 쿼리 파라미터에 결합된다
const [values, setValues] = usePageState(); // cardId, dateFrom, dateTo, status...

// After — 필요한 것만 각각
const [cardId, setCardId] = useCardIdQueryParam();
const [dateFrom, setDateFrom] = useDateFromQueryParam();
```

### 중복 코드를 의도적으로 허용한다

**두 곳에서 쓰인다는 이유만으로 공통화하지 않는다.**
페이지마다 동작이 달라질 여지가 있다면 중복을 남기는 쪽이 낫다.
성급히 공통화하면 이후 요구사항이 갈릴 때 분기 prop이 늘어나며 공통 모듈이 복잡해진다.

> **변경 방향이 확실해질 때까지 기다린다.**

### Props Drilling을 지운다

중간 컴포넌트가 자기가 쓰지 않는 prop을 전달하면, prop 하나가 바뀔 때 경로 전체가 수정된다.
React에서는 **children 조합**이나 Context로 경로를 끊는다.

```tsx
<!-- Before -->
<ItemEditBody {items} {recommendedItems} {onconfirm} />

<!-- After — 필요한 컴포넌트가 직접 받는다 -->
<ItemEditModal>
	<ItemEditList {items} />
	<RecommendedList items={recommendedItems} />
	<ConfirmButton {onconfirm} />
</ItemEditModal>
```

---

## 6. 4가지 기준은 서로 충돌한다

동시에 만족시키기 어렵다. **트레이드오프를 인지한 선택**이 핵심이다.

| 상황                                | 우선하는 기준                      |
| ----------------------------------- | ---------------------------------- |
| 함께 수정되지 않으면 버그가 나는가? | **응집도** 우선 — 추상화한다       |
| 위험이 낮고 방향이 갈릴 수 있는가?  | **가독성·결합도** 우선 — 중복 허용 |

---

## 7. 선언적 패턴 카탈로그

공통점은 **제어 흐름(상태·이벤트·라이프사이클)을 감추고 동작만 남긴다**는 것.

### 오버레이 — 상태 변수를 없앤다

```tsx
// Before — isOpen 상태와 setter가 화면 코드에 드러난다
const [isSheetOpen, setIsSheetOpen] = useState(false);
<button onClick={() => setIsSheetOpen(true)}>열기</button>
<BottomSheet open={isSheetOpen} onClose={() => setIsSheetOpen(false)}>내용</BottomSheet>

// After — "열어라"만 남는다
<button onClick={() => overlay.open(BottomSheetContent)}>열기</button>
```

React에서는 [overlay-kit](https://github.com/toss/overlay-kit)의
`overlay.openAsync<boolean>(...)`로 결과를 Promise로 받는다.

### 노출 감지 — 옵저버를 감춘다

`IntersectionObserver` 생성·해제, 스크롤 핸들러, 임계값 계산을 컴포넌트 안에 감춘다.

```tsx
<ImpressionArea onImpressionStart={() => log('viewed')}>
	<div>이 영역이 보이면 실행된다</div>
</ImpressionArea>
```

### 로깅 — 핸들러를 오염시키지 않는다

```tsx
<!-- Before — 클릭 핸들러에 로깅 호출이 섞인다 -->
<button
	onclick={() => {
		log({ title: '사기', price });
		buy();
	}}>사기</button
>

<!-- After — 로깅은 감싸는 레이어의 책임 -->
<LoggingClick params={{ price }}>
	<button onclick={buy}>사기</button>
</LoggingClick>
```

### 다단계 플로우(퍼널) — 단계 전환을 선언한다

단계별 상태를 타입으로 보장하면 "이전 단계 값이 있는지"를 따로 증명하지 않아도 된다.
**단계 전환은 퍼널을 쓰는 곳에서만 일어나게 하고, `setStep`을 하위로 내려보내지 않는다.**
React는 [@use-funnel](https://use-funnel.slash.page/).

### 비동기 — 로딩/에러 분기를 바깥으로 위임한다

```tsx
// Before — 하나의 컴포넌트가 로딩·에러·성공 세 가지 맥락을 갖는다
if (isLoading) return <Spinner />;
if (error) return <ErrorView />;
return <Profile data={data} />;

// After
<ErrorBoundary fallback={<ErrorView />}>
	<Suspense fallback={<Spinner />}>
		<Profile />
	</Suspense>
</ErrorBoundary>;
```

이는 "같이 실행되지 않는 코드 분리하기"(가독성)와 동일한 원리다.
App Router에서는 `loading.tsx`와 `error.tsx`가 같은 역할을 한다.

---

## 8. 리뷰 체크리스트

읽는 순서대로 위에서 아래로 확인한다. 앞 항목이 더 자주, 더 크게 문제가 된다.
**★ 표시는 ESLint가 이미 잡으므로 사람이 볼 필요 없다.**

### 가독성

- [ ] 이 함수/컴포넌트가 동시에 고려하는 맥락이 6~7개를 넘지 않는가
- [ ] 분기로 인해 동시에 실행되지 않는 코드가 한 곳에 섞여 있지 않은가
- [ ] 이름 없는 복잡한 조건식, 정체불명의 숫자가 없는가
- [ ] 이해하려고 파일·함수를 여러 번 오르내리게 하지 않는가
- [x] ★ 중첩 삼항 (`no-nested-ternary`) / 비교식 방향 (`yoda`)

### 예측 가능성

- [ ] 라이브러리·기존 함수와 같은 이름으로 다른 동작을 하지 않는가
- [ ] 같은 계열 함수/훅의 반환 타입이 일관적인가
- [ ] 이름이 약속하지 않은 부수 효과(로깅, 저장, 이동)가 숨어 있지 않은가
- [x] ★ 스코프 간 이름 가림 (`@typescript-eslint/no-shadow`)

### 응집도

- [ ] 같이 바뀔 파일들이 같은 디렉토리에 있는가
- [ ] 함께 바뀌어야 하는 값들이 하나의 상수/함수를 공유하는가
- [ ] 폼 검증의 응집 단위(필드 vs 폼 전체)를 의식적으로 골랐는가

### 결합도

- [ ] 한 훅/함수가 여러 관심사를 동시에 갖고 있지 않은가
- [ ] 아직 방향이 갈릴 수 있는 코드를 성급히 공통화하지 않았는가
- [ ] 중간 컴포넌트가 쓰지 않는 prop을 전달하고 있지 않은가

### 선언 레벨

- [ ] 이 추상화는 재사용이 목적인가, **변경 비용 절감**이 목적인가
- [ ] prop이 계속 늘어나며 인터페이스가 무너지고 있지 않은가
- [ ] 제어 흐름(상태 변수, 옵저버, 라이프사이클)이 화면 코드에 노출되어 있지 않은가

---

## 참고

- [선언적인 코드 작성하기](https://toss.tech/article/frontend-declarative-code)
- [Frontend Fundamentals](https://frontend-fundamentals.com/code-quality/code/)
- [overlay-kit](https://github.com/toss/overlay-kit) / [@use-funnel](https://use-funnel.slash.page/)
