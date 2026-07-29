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
2. **Codemod 단계** — 6개 v4 codemod를 **엄격한 순서로, 각각 정확히 한 번씩** 실행
   (`package-name-migration` → `semantic-token-migration` → `css-variable-migration` →
   `dom-identifier-migration` → `list-card-migration` → `form-control-migration`).
   Workflow 도구로 오케스트레이션되어 codemod는 순차 실행(단계별 검증·선택적 단계별
   커밋), 이후 수동 마이그레이션 대상 스캔은 병렬로 수행됩니다.
3. **수동 마이그레이션** — theme 토큰 `var(--...)` 산술 코드, package.json/설정 파일의
   패키지명 변경, semantic 토큰 후속 작업(foreground/surface 재분류, 삭제된 accent 토큰),
   CSS 변수·DOM 식별자 잔여물(동적으로 조립된 이름, 변환 대상 밖 파일), Card/ListCard·FormControl 후속 작업,
   Modal/TextField/TextArea/SegmentedControl/Select 동작 변경 대응, ThemeProvider 쿠키 저장소
   전환.
4. **최종 검증** — 잔여 패턴 grep, install/typecheck/lint/build/tests, 결과 요약.

codemod는 순서에 민감하고 두 번 실행하면 안 됩니다(`form-control-migration` 재실행 시
마이그레이션된 코드가 손상됩니다). 진행 상태는 `.claude/montage-migration-v4.local.md`에
기록되어, 중단된 마이그레이션은 완료된 단계를 건너뛰고 첫 미완료 단계부터 재개됩니다.
