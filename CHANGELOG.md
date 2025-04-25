# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-alpha.3](https://github.com/wanteddev/wds/compare/v2.0.0-alpha.2...v2.0.0-alpha.3) (2025-04-25)

### Bug Fixes

- **wds-codemod:** JSXExpressionContainer -> Literal 구조로 되어있는 코드 마이그레이션 대응 ([#312](https://github.com/wanteddev/wds/issues/312)) ([15320af](https://github.com/wanteddev/wds/commit/15320af5a5cb719e092de00e3f6a6d8d2f62f177))

### Features

- **wds,wds-icon:** icon figma sync and new code connect publish ([#311](https://github.com/wanteddev/wds/issues/311)) ([c7c7b4f](https://github.com/wanteddev/wds/commit/c7c7b4fa0e225e97d4b2fc8ac14d2fa0ca7e1985))
- **wds:** floading action 컴포넌트 제거 ([#306](https://github.com/wanteddev/wds/issues/306)) ([eb9eb8c](https://github.com/wanteddev/wds/commit/eb9eb8cf56a5f66ffa8bc17a92bc9817f4e74aab))
- **wds:** input cursor 색상 변경 ([#304](https://github.com/wanteddev/wds/issues/304)) ([26c50e3](https://github.com/wanteddev/wds/commit/26c50e3ae9c229bd0b454cc7ef775da36bae8012))
- **wds:** typography rem 단위로 변경 ([#305](https://github.com/wanteddev/wds/issues/305)) ([1ecc869](https://github.com/wanteddev/wds/commit/1ecc869a66d86ce3de2f106c459a6ea6e870c5b8))
- 일부 RSC 환경에서 use client 붙이지 않아도 사용 가능하도록 개선 ([#307](https://github.com/wanteddev/wds/issues/307)) ([9f89c86](https://github.com/wanteddev/wds/commit/9f89c86d45b3182345b710592cf36d0b2ef37c90))

# [2.0.0-alpha.2](https://github.com/wanteddev/wds/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2025-04-04)

### Bug Fixes

- **wds-codemod:** 불필요한 코드 제거 및 누락된 마이그레이션 코드 추가 ([#302](https://github.com/wanteddev/wds/issues/302)) ([15725b6](https://github.com/wanteddev/wds/commit/15725b64e340ec8be13304c8426b6e03b52af63c))
- **wds-icon:** 누락된 icon symbol export 추가 ([#301](https://github.com/wanteddev/wds/issues/301)) ([e4faacb](https://github.com/wanteddev/wds/commit/e4faacb1cd6e2a25504944bdc2ec368ee404b593))

### Features

- **wds:** select radio 에서 클릭시 콘텐츠 닫히게 작업 필요 ([#303](https://github.com/wanteddev/wds/issues/303)) ([1bbc41b](https://github.com/wanteddev/wds/commit/1bbc41b93ebd00622b132cb913b48c3b7a9cbe8c))

# [2.0.0-alpha.1](https://github.com/wanteddev/wds/compare/v2.0.0-alpha.0...v2.0.0-alpha.1) (2025-03-31)

### Bug Fixes

- **wds-codemod:** cli 내보내기 파일 수정 ([#300](https://github.com/wanteddev/wds/issues/300)) ([a6745b9](https://github.com/wanteddev/wds/commit/a6745b9e6ccd7802f2ad9eb565ecc8d310c11006))

# 2.0.0-alpha.0 (2025-03-31)

### Bug Fixes

- **wds-codemod:** option padding 마이그레이션 누락 수정 ([d15b492](https://github.com/wanteddev/wds/commit/d15b492f842e6f7a0c108b7a9d7a0052daeccc98))
- **wds:** menu, select에 shadow가 올바르게 적용되지 않음, wrapperProps 추가 ([#279](https://github.com/wanteddev/wds/issues/279)) ([dd1a234](https://github.com/wanteddev/wds/commit/dd1a2344a8b0e106a198b13f5d86d17156d28264))
- **wds:** category 컴포넌트 잘못된 조건 수정 ([#278](https://github.com/wanteddev/wds/issues/278)) ([ceaf3b7](https://github.com/wanteddev/wds/commit/ceaf3b7790fdcfa508b9300a5fe15f91122e9b65))
- **wds:** empty state text sx 속성 지원 ([11f025d](https://github.com/wanteddev/wds/commit/11f025d0f06b649674861da6ea37345c294e172f))
- **wds,wds-icon:** icon figma sync and new code connect publish ([#295](https://github.com/wanteddev/wds/issues/295)) ([1266163](https://github.com/wanteddev/wds/commit/1266163df3b282ae9c72514cc3d4ec2bf46ad20d))
- palette atomic, semantic 분리 및 accent 마이그레이션 ([#291](https://github.com/wanteddev/wds/issues/291)) ([8df5042](https://github.com/wanteddev/wds/commit/8df504231c26ef7ce5f9f5d1ef67a290176c2e11))
- **wds,wds-codemod:** section header leading content -> heading content 명칭 변경 ([#292](https://github.com/wanteddev/wds/issues/292)) ([0f126fe](https://github.com/wanteddev/wds/commit/0f126fed359954ebf7b6027345ace41cfcefdff4))
- **wds,wds-codemod:** toast 디자인 업데이트 및 snackbar, toast 개선 ([#285](https://github.com/wanteddev/wds/issues/285)) ([612eadf](https://github.com/wanteddev/wds/commit/612eadf1f0be1964331fea1f51bd9490d090327c))
- **wds,wds-codemod:** size 네이밍 컨벤션 통일화 ([#297](https://github.com/wanteddev/wds/issues/297)) ([7dcad17](https://github.com/wanteddev/wds/commit/7dcad176a0e6dca979abd5aff1b2411c026c662b))
- **wds,wds-icon:** icon figma sync and new code connect publish ([#290](https://github.com/wanteddev/wds/issues/290)) ([aa23da](https://github.com/wanteddev/wds/commit/aa23dabe47367742a7f751dc288516b7ef59f064))
- **wds,wds-codemod:** left, rightContent -> leading, trailingContent ([#284](https://github.com/wanteddev/wds/issues/284)) ([891ea0](https://github.com/wanteddev/wds/commit/891ea06cd68f1d80282160ca95b94f002beff62d))
- **wds,wds-codemod:** avatar variant명 변경 및 push badge 구조 변경 ([#282](https://github.com/wanteddev/wds/issues/282)) ([b42b8e](https://github.com/wanteddev/wds/commit/b42b8eef17e4bfd284f392578ba3a1d3a359cad2))
- **wds,wds-codemod:** menu bottom -> menu action area 변경 ([#281](https://github.com/wanteddev/wds/issues/281)) ([f1e52a](https://github.com/wanteddev/wds/commit/f1e52a5180424b052160bf18a01de8368852df93))
- **wds,wds-codemod:** action area sticky 옵션 네이밍 변경 ([#272](https://github.com/wanteddev/wds/issues/272)) ([404f6c](https://github.com/wanteddev/wds/commit/404f6c99a529ac5c9989c0eca6b681675e200f24))
- **wds,wds-codemod:** heading -> title 명칭 변경 ([#270](https://github.com/wanteddev/wds/issues/270)) ([243c4c](https://github.com/wanteddev/wds/commit/243c4cf05831e927ba6fd3217dfb494cb021445e))
- **wds,wds-codemod:** input -> field 네이밍 변경 ([#269](https://github.com/wanteddev/wds/issues/269)) ([e01662](https://github.com/wanteddev/wds/commit/e01662da4a5f74163f33439c962817c875ecb556))
- **wds,wds-codemod:** modal size huge 제거, fixed 옵션 resize로 분리 ([#268](https://github.com/wanteddev/wds/issues/268)) ([55c199](https://github.com/wanteddev/wds/commit/55c1995c4b61c34ec5f98c6ca46f8ba6ae7b424d))
- **wds,wds-codemod:** action area priority -> variant, variant -> extra ([#266](https://github.com/wanteddev/wds/issues/266)) ([577814](https://github.com/wanteddev/wds/commit/577814acd77ca8bd58195eb3a8d3f689093f5ebe))
- **wds:** accordion disableAnimation 인터페이스 추가, rotate props 추가 ([#260](https://github.com/wanteddev/wds/issues/260)) ([3d5419](https://github.com/wanteddev/wds/commit/3d54198ad36c7770934ed3cf8eb6db54d63f9161))
- **wds,wds-codemod:** vertical-padding, horizontal-padding 옵션 네이밍 변경 ([#259](https://github.com/wanteddev/wds/issues/259)) ([749f02](https://github.com/wanteddev/wds/commit/749f0200efd756d0dba83f5e52747cb861c76887))
- **wds,wds-codemod:** play-icon-badge 명칭 변경 ([#263](https://github.com/wanteddev/wds/issues/263)) ([28ae20](https://github.com/wanteddev/wds/commit/28ae20528c12c2094652296d3aaf483eb0ec73f4))
- **wds-codemod:** 캐시가 있을 때 codemod 빌드가 올바르게 되지 않는 현상 ([#254](https://github.com/wanteddev/wds/issues/254)) ([3205a4](https://github.com/wanteddev/wds/commit/3205a485a7f9a152b1bb510a40160ed52f64f162))
- **wds,wds-codemod:** nested-checkbox 컴포넌트 명 변경 ([#253](https://github.com/wanteddev/wds/issues/253)) ([934dfc](https://github.com/wanteddev/wds/commit/934dfc4f56143b3fc4fa74633907883a22ab6448))
- **wds,wds-codemod:** typography variant kebab-case 변경 ([#249](https://github.com/wanteddev/wds/issues/249)) ([e44bfa](https://github.com/wanteddev/wds/commit/e44bfa50a8017b0b5c010f2e211f93ba9a1a24b4))
- **wds:** reset 버튼 pointerdown -> click으로 변경 ([91945e](https://github.com/wanteddev/wds/commit/91945e423891fa8e8e79fd6ab428e495288939c8))

### Features

- palette atomic, semantic 분리 및 accent 마이그레이션 ([#291](https://github.com/wanteddev/wds/issues/291)) ([8df5042](https://github.com/wanteddev/wds/commit/8df504231c26ef7ce5f9f5d1ef67a290176c2e11))
- **wds,wds-codemod:** section header leading content -> heading content 명칭 변경 ([#292](https://github.com/wanteddev/wds/issues/292)) ([0f126fe](https://github.com/wanteddev/wds/commit/0f126fed359954ebf7b6027345ace41cfcefdff4))
- **wds,wds-codemod:** toast 디자인 업데이트 및 snackbar, toast 개선 ([#285](https://github.com/wanteddev/wds/issues/285)) ([612eadf](https://github.com/wanteddev/wds/commit/612eadf1f0be1964331fea1f51bd9490d090327c))
- **wds,wds-codemod:** size 네이밍 컨벤션 통일화 ([#297](https://github.com/wanteddev/wds/issues/297)) ([7dcad17](https://github.com/wanteddev/wds/commit/7dcad176a0e6dca979abd5aff1b2411c026c662b))
- **wds,wds-icon:** icon figma sync and new code connect publish ([#290](https://github.com/wanteddev/wds/issues/290)) ([aa23dab](https://github.com/wanteddev/wds/commit/aa23dabe47367742a7f751dc288516b7ef59f064))
- **wds,wds-codemod:** left, rightContent -> leading, trailingContent ([#284](https://github.com/wanteddev/wds/issues/284)) ([891ea06](https://github.com/wanteddev/wds/commit/891ea06cd68f1d80282160ca95b94f002beff62d))
- **wds,wds-codemod:** avatar variant명 변경 및 push badge 구조 변경 ([#282](https://github.com/wanteddev/wds/issues/282)) ([b42b8e](https://github.com/wanteddev/wds/commit/b42b8eef17e4bfd284f392578ba3a1d3a359cad2))
- **wds,wds-codemod:** menu bottom -> menu action area 변경 ([#281](https://github.com/wanteddev/wds/issues/281)) ([f1e52a5](https://github.com/wanteddev/wds/commit/f1e52a5180424b052160bf18a01de8368852df93))
- **wds,wds-codemod:** action area sticky 옵션 네이밍 변경 ([#272](https://github.com/wanteddev/wds/issues/272)) ([404f6c9](https://github.com/wanteddev/wds/commit/404f6c99a529ac5c9989c0eca6b681675e200f24))
- **wds,wds-codemod:** heading -> title 명칭 변경 ([#270](https://github.com/wanteddev/wds/issues/270)) ([243c4cf](https://github.com/wanteddev/wds/commit/243c4cf05831e927ba6fd3217dfb494cb021445e))
- **wds,wds-codemod:** input -> field 네이밍 변경 ([#269](https://github.com/wanteddev/wds/issues/269)) ([e01662d](https://github.com/wanteddev/wds/commit/e01662da4a5f74163f33439c962817c875ecb556))
- **wds,wds-codemod:** modal size huge 제거, fixed 옵션 resize로 분리 ([#268](https://github.com/wanteddev/wds/issues/268)) ([55c1995](https://github.com/wanteddev/wds/commit/55c1995c4b61c34ec5f98c6ca46f8ba6ae7b424d))
- **wds,wds-codemod:** action area priority -> variant, variant -> extra ([#266](https://github.com/wanteddev/wds/issues/266)) ([577814a](https://github.com/wanteddev/wds/commit/577814acd77ca8bd58195eb3a8d3f689093f5ebe))
- **wds:** accordion disableAnimation 인터페이스 추가, rotate props 추가 ([#260](https://github.com/wanteddev/wds/issues/260)) ([3d54198](https://github.com/wanteddev/wds/commit/3d54198ad36c7770934ed3cf8eb6db54d63f9161))
- **wds,wds-codemod:** vertical-padding, horizontal-padding 옵션 네이밍 변경 ([#259](https://github.com/wanteddev/wds/issues/259)) ([749f020](https://github.com/wanteddev/wds/commit/749f0200efd756d0dba83f5e52747cb861c76887))
- **wds,wds-codemod:** play-icon-badge 명칭 변경 ([#263](https://github.com/wanteddev/wds/issues/263)) ([28ae205](https://github.com/wanteddev/wds/commit/28ae20528c12c2094652296d3aaf483eb0ec73f4))
- **wds,wds-codemod:** nested-checkbox 컴포넌트 명 변경 ([#253](https://github.com/wanteddev/wds/issues/253)) ([934dfc4](https://github.com/wanteddev/wds/commit/934dfc4f56143b3fc4fa74633907883a22ab6448))
- **wds,wds-codemod:** typography variant kebab-case 변경 ([#249](https://github.com/wanteddev/wds/issues/249)) ([e44bfa5](https://github.com/wanteddev/wds/commit/e44bfa50a8017b0b5c010f2e211f93ba9a1a24b4))
