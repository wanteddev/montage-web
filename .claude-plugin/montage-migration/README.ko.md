# Montage Web Migration

Montage(Wanted Design System for Web) 메이저 버전 간 마이그레이션을 수행하는 플러그인입니다.

[English](./README.md) | [한국어](./README.ko.md)

## 설치

```bash
/plugin marketplace add wanteddev/montage-web
```

```bash
/plugin install montage-web-migration@montage-web
```

## 스킬

### montage-v3-to-v4

프로젝트를 Montage v3(`@wanteddev/wds*` 3.x)에서 v4(`@montage-ui/*` 4.x)로 마이그레이션합니다.

다음과 같이 요청하면 실행됩니다:

- "montage v4로 마이그레이션해줘"
- "wds 4.0으로 업그레이드해줘"
- "Migrate this project to @montage-ui 4"

동작 방식:

1. **사전 점검** — 마이그레이션 상태 파일을 가장 먼저 확인하고(재개를 신규 실행으로 오인하지
   않도록), 이어서 버전 확인, git 클린 상태 확인, 대상 디렉토리 선택.
2. **Codemod 단계** — 9개 v4 codemod를 **엄격한 순서로, 각각 정확히 한 번씩** 실행
   (`package-name-migration` → `semantic-token-migration` → `css-variable-migration` →
   `dom-identifier-migration` → `list-card-migration` → `form-control-migration` →
   `push-badge-migration` → `status-migration` → `list-cell-variant-migration`).
   Workflow 도구로 오케스트레이션되어 codemod는 순차 실행(단계별 검증·선택적 단계별
   커밋), 이후 수동 마이그레이션 대상 스캔은 병렬로 수행됩니다.
3. **수동 마이그레이션** — theme 토큰 `var(--...)` 산술 코드, package.json/설정 파일의
   패키지명 변경, semantic 토큰 후속 작업(foreground/surface 재분류, 삭제된 accent 토큰),
   CSS 변수·DOM 식별자 잔여물(동적으로 조립된 이름, 변환 대상 밖 파일), Card/ListCard·FormControl 후속 작업,
   Modal/TextField/TextArea/SegmentedControl/Select/PushBadge/SearchField/FallbackView 동작
   변경 대응, `invalid`/`positive` → `status` 잔여물, ListCell 개편 후속 작업(MenuItem/Option의
   `fillWidth`, selected 기본 체크 아이콘, 타이포·DOM 변경), ThemeProvider 쿠키 저장소 전환,
   IconButton `disableInteraction` → `interactionEffect` 전환(TopNavigation 아이콘 버튼은
   인터랙션 레이어 대신 아이콘이 어두워지는 방식으로 변경), 단독 아이콘 버튼의
   `interactionOverflow` 적용(TabList / CategoryList `iconButton` 을 포함한 컴포넌트 슬롯 안의
   아이콘 버튼은 슬롯의 `interactionOverflow` 를 이어받으므로, 3.x 숫자 `size` 를 남기면 3.x 와
   같고 지우면 슬롯 크기를 따름(대개 작아짐). 3.x 에서 `size` 없이 쓰던 아이콘 버튼(3.x 24px)도 슬롯 크기를
   따르므로(대개 작아짐), 3.x 크기를 유지하려면 `size={24}` 추가 — 화면별로 선택),
   TopNavigation / ModalNavigation 변경 대응(`ModalClose` → `ModalNavigationButton variant="close-button"`,
   `icon` / `text` → `icon-button` / `text-button` variant, ModalNavigation `display` →
   `emphasized`, 모달 navigation DOM 식별자), Modal 레이아웃·여백 변경 대응(ModalContainer
   `size="small"` → `medium`, container별 ModalNavigation 기본 variant, ModalContent
   `horizontalPadding` / `verticalPadding`, `--modal-content-margin` → `-x` / `-y`),
   ContentBadge `outlined` 배경 투명화 대응.
4. **최종 검증** — 잔여 패턴 grep, install/typecheck/lint/build/tests, 결과 요약.

codemod는 순서에 민감하고 모든 단계를 한 번만 실행하는 것으로 취급합니다. 재실행은 단순히
낭비가 아니라 코드를 손상시킬 수 있습니다: `form-control-migration`은 이미 마이그레이션된 코드를
항상 손상시키고(FormField → FormControl → FormControlField 스왑이 새 루트 이름을 다시 바꿈),
`list-cell-variant-migration`은 직접 작성한 v4 `variant="button"`을 `text-button`으로 조용히
바꾸며, `list-card-migration` / `css-variable-migration`도 특정 조건(반쯤 마이그레이션된 파일·같은
이름을 두 specifier로 import한 파일, 소비자가 정의한 `--wds-wds-*` 변수)에서 코드를 손상시킵니다.
그래서 진행 상태는 `.claude/montage-migration-v4.local.md`에 기록되어, 중단된 마이그레이션은
완료된 단계를 건너뛰고 첫 미완료 단계부터 재개됩니다.
