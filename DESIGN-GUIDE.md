# 디자인 시스템 작업 가이드

Montage 디자인 시스템 컴포넌트를 수정하거나 추가할 때 따라야 할
**디자인 원칙, 참조 링크, 작업 절차**를 다룹니다. 위의 기술 규칙과 함께 읽어주세요.

## 1. 기존 디자인 시스템 파악

작업을 시작하기 전에 항상 Montage 공식 문서에서 해당 컴포넌트의 현재 사양을 확인합니다.

- **문서 사이트**: https://montage.wanted.co.kr/
- **컴포넌트별 문서 경로 예시**:  
  `https://montage.wanted.co.kr/docs/components/{category}/{component-name}/web`

확인 포인트:

- 현재 API(props, variant, size) 체계
- default 값과 예외 케이스
- 다른 플랫폼(iOS/Android) 사양과의 차이
- 관련 컴포넌트와의 일관성(예: Chip, Button 등 유사 컴포넌트)

## 2. Figma 파운데이션 사용

Figma에서 작업할 때는 반드시 Montage 디자인 시스템 라이브러리의 파운데이션을 사용합니다.
하드코딩된 값(색상 hex, 임의의 폰트 크기, 임의의 radius 등) 대신 라이브러리 토큰/스타일을 참조하세요.

### 타이포그래피

- **타이포그래피 라이브러리**:  
  https://www.figma.com/design/2orYfqIiuFhTGXKN1GARg7/2-Typo---Grid?m=auto&node-id=1038-2&t=ty8dQ9XNxwaqTwjW-1

### 컬러 (중요: 2개 파일 구조)

컬러는 **Atomic → Semantic → Style**의 3단계 구조로 되어 있습니다.  
두 파일이 서로 참조 관계에 있으므로 **반드시 두 파일을 모두 조회해야 값이 resolve됩니다.**

이 구조는 위의 "Theme System" 섹션에서 설명한 `wds-theme` 패키지의 토큰 구조와
동일한 철학을 따릅니다 (raw atomic → semantic → components).

```
[Atomic 파일]              [Semantic 파일]            [컴포넌트 사용]
변수(raw 값 정의)    →     변수(atomic alias)    →    스타일
예: #171717              예: color.label.normal     예: semantic.label.normal
```

- **Atomic 컬러 라이브러리** (raw 값이 정의된 원본):  
  https://www.figma.com/design/r0LXCzm4slyOAhR7jVp1DM/3-Color---%F0%9F%8E%A8-Atomic?m=auto&node-id=19-2&t=tdVzaDvFy3GLPt9w-1

- **Semantic 컬러 라이브러리** (atomic을 alias로 참조 + 스타일로 래핑):  
  https://www.figma.com/design/YfMmyQn7XDsRFm5PqV2rLU/3-Color---Semantic?m=auto&node-id=0-1&t=UlkExW7swdpEe05M-1

### 컬러 조회 시 지켜야 할 순서

1. **먼저 Atomic 파일에 접근 가능한지 확인**할 것
2. Semantic 파일의 변수/스타일을 조회할 때, 그 값이 alias라면 **Atomic 파일까지
   타고 들어가서 실제 raw 값(hex)을 확인**할 것
3. 컴포넌트 코드에는 **최종 사용 레이어인 Semantic 스타일 이름**만 사용할 것  
   (atomic 변수를 직접 참조하지 말 것)
4. 만약 Atomic 파일에 접근할 수 없어서 값을 resolve하지 못하는 경우,
   **추측하지 말고 사용자에게 알릴 것**  
   ("semantic 파일의 {변수명}이 atomic을 참조하는데 atomic 파일에 접근할 수 없어서
   실제 값을 확인하지 못했습니다" 형태로 명시)

### 컬러 관련 문제 해결 (Troubleshooting)

**증상: semantic 파일을 열었는데 변수 값이 비어 있거나 alias만 보임**

원인은 대부분 아래 중 하나입니다:

- Atomic 파일에 접근 권한이 없음 → 두 파일 모두 같은 권한으로 공유되어 있는지 확인
- Atomic 라이브러리가 semantic 파일에 publish/subscribe 되어 있지 않음 → Figma에서
  라이브러리 구독 상태 확인
- 스타일 → semantic 변수 → atomic 변수 체인이 중간에 끊김 → Figma에서 스타일의
  "variable mode"가 제대로 연결되어 있는지 확인

이런 경우 에이전트는 작업을 중단하고 사용자에게 어떤 단계에서 막혔는지 보고해야 합니다.

## 3. 아이콘 및 로고

아이콘과 로고는 직접 그리거나 외부에서 가져오지 말고, 아래 Component 파일에 등록된
인스턴스를 사용합니다.

- **Component 파일**:  
  https://www.figma.com/design/7RHtWV3Pw6I98UEDjbx5V1/0-Component?m=auto&node-id=26882-89366&t=EsUY4wJGsxIX7Ub1-1

코드상에서는 `@wanteddev/wds-icon` 패키지의 아이콘 컴포넌트를 사용합니다.

## 4. Figma 연동 (figma-use / use_figma)

이 프로젝트는 Figma MCP 서버를 통해 Montage 디자인 라이브러리에 직접 접근합니다.
`use_figma` 도구와 `/figma-use` 기본 skill을 사용해서 작업합니다.

### 작업 원칙

- 컴포넌트 수정 요청을 받으면, 먼저 Montage Figma 라이브러리에서 해당 컴포넌트의
  현재 variant, variable, 토큰을 조회할 것
- 코드에 값을 반영할 때는 Figma variable 이름과 매핑되도록 할 것 (하드코딩 금지)
- 파운데이션(타이포/컬러/아이콘)은 위 섹션 2, 3에 명시된 라이브러리에 연결된 것만 사용할 것
- 코드 수정 후 Figma 시안과 어긋나는 부분이 있는지 검증할 것
- 코드 → Figma 역방향 반영이 필요한 경우, 먼저 사용자에게 확인받을 것

### 참고 링크

- Figma 블로그 — Agents, meet the Figma canvas:  
  https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/
- MCP 서버 가이드:  
  https://help.figma.com/hc/en-us/articles/39216419318551
- Skill 문서:  
  https://developers.figma.com/docs/figma-mcp-server/create-skills/

## 5. 디자인 토큰 사용 원칙

### 기본 원칙

- **컴포넌트 코드에 raw 값을 하드코딩하지 말 것** (예: `border-radius: 8px` ❌)
- 항상 `wds-theme`의 semantic 토큰을 경유해서 값을 참조할 것
- Primitive(atomic) 토큰 → Semantic 토큰 → 컴포넌트의 3단계 구조를 유지할 것  
  (이는 "Theme System" 섹션의 `wds-theme` 아키텍처와 일치)

### 사이즈별 비율 일관성

radius, padding, gap 등 사이즈에 따라 달라지는 값을 정의할 때는
**사이즈 간 비율 일관성**을 유지해야 합니다.

- 예: xsmall/small/medium의 `radius ÷ height` 비율이 비슷하게 유지되는지 확인
- 비율이 흐트러지면 "큰 사이즈일수록 각져 보이는" 등의 시각적 이질감이 생김
- 새 사이즈를 추가하거나 기존 값을 수정할 때 반드시 비율 표를 작성해서 확인할 것

## 6. 컴포넌트 작업 체크리스트

컴포넌트 수정 PR을 올리기 전에 아래 항목을 모두 확인합니다.
(빌드/테스트/린트 명령어는 위의 "Common Commands" 섹션 참조)

- [ ] Montage 문서(https://montage.wanted.co.kr/)에서 현재 사양을 확인했는가?
- [ ] Figma 시안에서 값을 직접 조회했는가? (`use_figma` 활용)
- [ ] 컬러 사용 시 Atomic + Semantic 두 파일을 모두 확인했는가?
- [ ] 기존 API(props)를 깨뜨리지 않는가?
- [ ] `wds-theme`의 semantic 토큰을 사용했는가? (raw 값 하드코딩 금지)
- [ ] 사이즈 간 비율 일관성이 유지되는가?
- [ ] 수정 대상 외의 다른 사이즈/variant에 영향이 없는가?
- [ ] `pnpm test:unit`과 `pnpm test:visual`이 통과하는가?
- [ ] `pnpm lint`가 통과하는가?
- [ ] Size-limit이 초과되지 않는가? (wds는 5KB gzipped 제한)
- [ ] Changeset을 추가했는가?
- [ ] 커밋 메시지가 Conventional Commits 형식인가?

## 7. 금지 사항

- ❌ raw 값 하드코딩 (`'8px'`, `'#333'` 등을 컴포넌트에 직접 쓰지 말 것)
- ❌ Figma 라이브러리에 없는 색상/폰트/아이콘 사용
- ❌ 기존 API prop 삭제 또는 이름 변경 (Breaking change는 별도 논의 필요)
- ❌ Changeset 없이 머지
- ❌ Semantic 스타일을 우회해서 Atomic 변수를 직접 참조
