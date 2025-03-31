# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 2.0.0-alpha.0 (2025-03-31)

### Bug Fixes

- **wds-codemod:** codemod build error 수정 ([7053cd9](https://github.com/wanteddev/wds/commit/7053cd92e868c42c19159ebb6dcdb99bf6673171))
- **wds-codemod:** codemod npmignore 추가 ([04954ef](https://github.com/wanteddev/wds/commit/04954eff5ad1926c368539ef4cbc15a1b607be76))
- **wds-codemod:** codemod 진입점 수정 ([c61aed0](https://github.com/wanteddev/wds/commit/c61aed07be529eddd550849a72e71bc7d85590a5))
- **wds-codemod:** export files 수정 ([0051a18](https://github.com/wanteddev/wds/commit/0051a1803a7ddf7229492656b08ab6163c55486f))
- **wds-codemod:** list-item -> list-cell padding 변환 추가 ([d8a8e7a](https://github.com/wanteddev/wds/commit/d8a8e7acc9f0d0149d6346d3a81f8ddbdba59b63))
- **wds-codemod:** option padding 마이그레이션 누락 수정 ([d15b492](https://github.com/wanteddev/wds/commit/d15b492f842e6f7a0c108b7a9d7a0052daeccc98))
- **wds-codemod:** type import, import 구문 변환 ([d43dc72](https://github.com/wanteddev/wds/commit/d43dc722dd8d0ae21411fcae34540e7495da1dd3))
- **wds-codemod:** 누락된 마이그레이션 코드 추가 대응 ([#107](https://github.com/wanteddev/wds/issues/107)) ([e1ed2bb](https://github.com/wanteddev/wds/commit/e1ed2bb085181bc3a802bea717759b39c26ecb3f))
- **wds-codemod:** 불필요한 as prop 마이그레이션 제거 ([c0bbcf5](https://github.com/wanteddev/wds/commit/c0bbcf5eb4c7f1095abe07566b8615914bae98aa))
- **wds-codemod:** 빌드 오류 수정 ([d148f00](https://github.com/wanteddev/wds/commit/d148f00391e4508bebb1df21b56f3e1cea766851))
- **wds-codemod:** 캐시가 있을 때 codemod 빌드가 올바르게 되지 않는 현상 ([#254](https://github.com/wanteddev/wds/issues/254)) ([3205a48](https://github.com/wanteddev/wds/commit/3205a485a7f9a152b1bb510a40160ed52f64f162))
- **wds-theme:** 빌드 오류 수정 ([dc3b275](https://github.com/wanteddev/wds/commit/dc3b275b9e77363d7bb87e514f476045f39b8772))

### Features

- palette atomic, semantic 분리 및 accent 마이그레이션 ([#291](https://github.com/wanteddev/wds/issues/291)) ([8df5042](https://github.com/wanteddev/wds/commit/8df504231c26ef7ce5f9f5d1ef67a290176c2e11))
- react 19, next 15 버전 대응 ([#190](https://github.com/wanteddev/wds/issues/190)) ([917671a](https://github.com/wanteddev/wds/commit/917671a4b9652ead45b840d29a32683d73c7fafd))
- **wds-codemod:** default path 변경 ([0b2ba7a](https://github.com/wanteddev/wds/commit/0b2ba7a89d96ebdb56b28207ae5105674673a8f2))
- **wds-codemod:** list cell migration 코드 지원 ([#200](https://github.com/wanteddev/wds/issues/200)) ([ba01d08](https://github.com/wanteddev/wds/commit/ba01d083c549d41a58d0c6eddac05ca954ed8e84))
- **wds-codemod:** textfield migration codemod 제작 ([#94](https://github.com/wanteddev/wds/issues/94)) ([cd7cf98](https://github.com/wanteddev/wds/commit/cd7cf98313a72db5d93b94a5cd612a94aedfdf34))
- **wds,wds-codemod:** [WDS] 250114 ChipAction 업데이트 ([#217](https://github.com/wanteddev/wds/issues/217)) ([07c5f52](https://github.com/wanteddev/wds/commit/07c5f52284d48f51f1521c08221f5ab7ca16ff48))
- **wds,wds-codemod:** action area priority -> variant, variant -> extra ([#266](https://github.com/wanteddev/wds/issues/266)) ([577814a](https://github.com/wanteddev/wds/commit/577814acd77ca8bd58195eb3a8d3f689093f5ebe))
- **wds,wds-codemod:** action area sticky 옵션 네이밍 변경 ([#272](https://github.com/wanteddev/wds/issues/272)) ([404f6c9](https://github.com/wanteddev/wds/commit/404f6c99a529ac5c9989c0eca6b681675e200f24))
- **wds,wds-codemod:** avatar variant명 변경 및 push badge 구조 변경 ([#282](https://github.com/wanteddev/wds/issues/282)) ([b42b8ee](https://github.com/wanteddev/wds/commit/b42b8eef17e4bfd284f392578ba3a1d3a359cad2))
- **wds,wds-codemod:** heading -> title 명칭 변경 ([#270](https://github.com/wanteddev/wds/issues/270)) ([243c4cf](https://github.com/wanteddev/wds/commit/243c4cf05831e927ba6fd3217dfb494cb021445e))
- **wds,wds-codemod:** input -> field 네이밍 변경 ([#269](https://github.com/wanteddev/wds/issues/269)) ([e01662d](https://github.com/wanteddev/wds/commit/e01662da4a5f74163f33439c962817c875ecb556))
- **wds,wds-codemod:** left, rightContent -> leading, trailingContent ([#284](https://github.com/wanteddev/wds/issues/284)) ([891ea06](https://github.com/wanteddev/wds/commit/891ea06cd68f1d80282160ca95b94f002beff62d))
- **wds,wds-codemod:** menu bottom -> menu action area 변경 ([#281](https://github.com/wanteddev/wds/issues/281)) ([f1e52a5](https://github.com/wanteddev/wds/commit/f1e52a5180424b052160bf18a01de8368852df93))
- **wds,wds-codemod:** modal size huge 제거, fixed 옵션 resize로 분리 ([#268](https://github.com/wanteddev/wds/issues/268)) ([55c1995](https://github.com/wanteddev/wds/commit/55c1995c4b61c34ec5f98c6ca46f8ba6ae7b424d))
- **wds,wds-codemod:** nested-checkbox 컴포넌트 명 변경 ([#253](https://github.com/wanteddev/wds/issues/253)) ([934dfc4](https://github.com/wanteddev/wds/commit/934dfc4f56143b3fc4fa74633907883a22ab6448))
- **wds,wds-codemod:** play-icon-badge 명칭 변경 ([#263](https://github.com/wanteddev/wds/issues/263)) ([28ae205](https://github.com/wanteddev/wds/commit/28ae20528c12c2094652296d3aaf483eb0ec73f4))
- **wds,wds-codemod:** section header leading content -> heading content 명칭 변경 ([#292](https://github.com/wanteddev/wds/issues/292)) ([0f126fe](https://github.com/wanteddev/wds/commit/0f126fed359954ebf7b6027345ace41cfcefdff4))
- **wds,wds-codemod:** size 네이밍 컨벤션 통일화 ([#297](https://github.com/wanteddev/wds/issues/297)) ([7dcad17](https://github.com/wanteddev/wds/commit/7dcad176a0e6dca979abd5aff1b2411c026c662b))
- **wds,wds-codemod:** toast 디자인 업데이트 및 snackbar, toast 개선 ([#285](https://github.com/wanteddev/wds/issues/285)) ([612eadf](https://github.com/wanteddev/wds/commit/612eadf1f0be1964331fea1f51bd9490d090327c))
- **wds,wds-codemod:** typography variant kebab-case 변경 ([#249](https://github.com/wanteddev/wds/issues/249)) ([e44bfa5](https://github.com/wanteddev/wds/commit/e44bfa50a8017b0b5c010f2e211f93ba9a1a24b4))
- **wds,wds-codemod:** vertical-padding, horizontal-padding 옵션 네이밍 변경 ([#259](https://github.com/wanteddev/wds/issues/259)) ([749f020](https://github.com/wanteddev/wds/commit/749f0200efd756d0dba83f5e52747cb861c76887))
- **wds,wds-codemod:** 토스트, 스낵바 디자인 업데이트 ([#48](https://github.com/wanteddev/wds/issues/48)) ([44f11e0](https://github.com/wanteddev/wds/commit/44f11e02c8f4ce28917d5127d7d564b42a1f50d6))
- **wds,wds-icon,wds-codemod:** 20250305 기준 신규 아이콘 추가 ([#276](https://github.com/wanteddev/wds/issues/276)) ([b4077e5](https://github.com/wanteddev/wds/commit/b4077e5dfa50f36f53a89469a8dce2464677abee))
- **wds,wds-icon:** 아이콘 <-> 피그마 자동 동기화 및 code connect 구성 ([#60](https://github.com/wanteddev/wds/issues/60)) ([0d7b86d](https://github.com/wanteddev/wds/commit/0d7b86d6bea641008bd3567eaac4a4f22fece91c))
- **wds:** accordion disableAnimation 인터페이스 추가, rotate props 추가 ([#260](https://github.com/wanteddev/wds/issues/260)) ([3d54198](https://github.com/wanteddev/wds/commit/3d54198ad36c7770934ed3cf8eb6db54d63f9161))
- 디자인시스템 자체 엔진 개발 ([#7](https://github.com/wanteddev/wds/issues/7)) ([560e5c2](https://github.com/wanteddev/wds/commit/560e5c220e7e3def3b85b1ef8f80dfc992545373))

## [1.3.2](https://github.com/wanteddev/wds/compare/@wanteddev/wds-codemod@1.3.1...@wanteddev/wds-codemod@1.3.2) (2025-02-06)

### Features

- **wds,wds-codemod:** [WDS] 250114 ChipAction 업데이트 ([#217](https://github.com/wanteddev/wds/issues/217)) ([07c5f52](https://github.com/wanteddev/wds/commit/07c5f52284d48f51f1521c08221f5ab7ca16ff48))

## [1.3.1](https://github.com/wanteddev/wds/compare/@wanteddev/wds-codemod@1.3.0...@wanteddev/wds-codemod@1.3.1) (2024-12-18)

### Bug Fixes

- **wds-codemod:** list-item -> list-cell padding 변환 추가 ([d8a8e7a](https://github.com/wanteddev/wds/commit/d8a8e7acc9f0d0149d6346d3a81f8ddbdba59b63))

# [1.3.0](https://github.com/wanteddev/wds/compare/@wanteddev/wds-codemod@1.3.0-alpha.1...@wanteddev/wds-codemod@1.3.0) (2024-12-16)

**Note:** Version bump only for package @wanteddev/wds-codemod

# [1.3.0-alpha.1](https://github.com/wanteddev/wds/compare/@wanteddev/wds-codemod@1.3.0-alpha.0...@wanteddev/wds-codemod@1.3.0-alpha.1) (2024-12-16)

### Bug Fixes

- **wds-codemod:** export files 수정 ([0051a18](https://github.com/wanteddev/wds/commit/0051a1803a7ddf7229492656b08ab6163c55486f))

# [1.3.0-alpha.0](https://github.com/wanteddev/wds/compare/@wanteddev/wds-codemod@1.2.2...@wanteddev/wds-codemod@1.3.0-alpha.0) (2024-12-16)

### Features

- react 19, next 15 버전 대응 ([#190](https://github.com/wanteddev/wds/issues/190)) ([917671a](https://github.com/wanteddev/wds/commit/917671a4b9652ead45b840d29a32683d73c7fafd))
- **wds-codemod:** list cell migration 코드 지원 ([#200](https://github.com/wanteddev/wds/issues/200)) ([ba01d08](https://github.com/wanteddev/wds/commit/ba01d083c549d41a58d0c6eddac05ca954ed8e84))

## [1.2.2](https://github.com/wanteddev/wds/compare/@wanteddev/wds-codemod@1.2.1...@wanteddev/wds-codemod@1.2.2) (2024-09-30)

### Features

- **wds,wds-icon:** 아이콘 <-> 피그마 자동 동기화 및 code connect 구성 ([#60](https://github.com/wanteddev/wds/issues/60)) ([0d7b86d](https://github.com/wanteddev/wds/commit/0d7b86d6bea641008bd3567eaac4a4f22fece91c))

## [1.2.1](https://github.com/wanteddev/wds/compare/@wanteddev/wds-codemod@1.2.0...@wanteddev/wds-codemod@1.2.1) (2024-09-19)

### Bug Fixes

- **wds-codemod:** 누락된 마이그레이션 코드 추가 대응 ([#107](https://github.com/wanteddev/wds/issues/107)) ([e1ed2bb](https://github.com/wanteddev/wds/commit/e1ed2bb085181bc3a802bea717759b39c26ecb3f))

# [1.2.0](https://github.com/wanteddev/wds/compare/@wanteddev/wds-codemod@1.1.0...@wanteddev/wds-codemod@1.2.0) (2024-09-13)

### Bug Fixes

- **wds-codemod:** codemod build error 수정 ([7053cd9](https://github.com/wanteddev/wds/commit/7053cd92e868c42c19159ebb6dcdb99bf6673171))

### Features

- **wds-codemod:** textfield migration codemod 제작 ([#94](https://github.com/wanteddev/wds/issues/94)) ([cd7cf98](https://github.com/wanteddev/wds/commit/cd7cf98313a72db5d93b94a5cd612a94aedfdf34))

# [1.2.0](https://github.com/wanteddev/wds/compare/@wanteddev/wds-codemod@1.1.0...@wanteddev/wds-codemod@1.2.0) (2024-09-13)

### Features

- **wds-codemod:** textfield migration codemod 제작 ([#94](https://github.com/wanteddev/wds/issues/94)) ([cd7cf98](https://github.com/wanteddev/wds/commit/cd7cf98313a72db5d93b94a5cd612a94aedfdf34))

# [1.1.0](https://github.com/wanteddev/wds/compare/@wanteddev/wds-codemod@1.0.3...@wanteddev/wds-codemod@1.1.0) (2024-06-17)

### Features

- **wds,wds-codemod:** 토스트, 스낵바 디자인 업데이트 ([#48](https://github.com/wanteddev/wds/issues/48)) ([44f11e0](https://github.com/wanteddev/wds/commit/44f11e02c8f4ce28917d5127d7d564b42a1f50d6))

## [1.0.3](https://github.com/wanteddev/wds/compare/@wanteddev/wds-codemod@1.0.2...@wanteddev/wds-codemod@1.0.3) (2024-05-16)

### Bug Fixes

- **wds-codemod:** codemod npmignore 추가 ([04954ef](https://github.com/wanteddev/wds/commit/04954eff5ad1926c368539ef4cbc15a1b607be76))

## [1.0.2](https://github.com/wanteddev/wds/compare/@wanteddev/wds-codemod@1.0.1...@wanteddev/wds-codemod@1.0.2) (2024-05-13)

### Features

- **wds-codemod:** default path 변경 ([0b2ba7a](https://github.com/wanteddev/wds/commit/0b2ba7a89d96ebdb56b28207ae5105674673a8f2))

## [1.0.1](https://github.com/wanteddev/wds/compare/@wanteddev/wds-codemod@1.0.0...@wanteddev/wds-codemod@1.0.1) (2024-05-08)

### Bug Fixes

- **wds-codemod:** 불필요한 as prop 마이그레이션 제거 ([c0bbcf5](https://github.com/wanteddev/wds/commit/c0bbcf5eb4c7f1095abe07566b8615914bae98aa))

# [1.0.0](https://github.com/wanteddev/wds/compare/@wanteddev/wds-codemod@1.0.0-alpha.3...@wanteddev/wds-codemod@1.0.0) (2024-05-07)

**Note:** Version bump only for package @wanteddev/wds-codemod

# [1.0.0-alpha.3](https://github.com/wanteddev/wds/compare/@wanteddev/wds-codemod@1.0.0-alpha.2...@wanteddev/wds-codemod@1.0.0-alpha.3) (2024-05-02)

### Bug Fixes

- **wds-codemod:** type import, import 구문 변환 ([d43dc72](https://github.com/wanteddev/wds/commit/d43dc722dd8d0ae21411fcae34540e7495da1dd3))

# [1.0.0-alpha.2](https://github.com/wanteddev/wds/compare/@wanteddev/wds-codemod@1.0.0-alpha.1...@wanteddev/wds-codemod@1.0.0-alpha.2) (2024-05-02)

### Bug Fixes

- **wds-codemod:** codemod 진입점 수정 ([c61aed0](https://github.com/wanteddev/wds/commit/c61aed07be529eddd550849a72e71bc7d85590a5))

# [1.0.0-alpha.1](https://github.com/wanteddev/wds/compare/@wanteddev/wds-codemod@1.0.0-alpha.0...@wanteddev/wds-codemod@1.0.0-alpha.1) (2024-05-02)

**Note:** Version bump only for package @wanteddev/wds-codemod

# 1.0.0-alpha.0 (2024-05-02)

### Bug Fixes

- **wds-codemod:** 빌드 오류 수정 ([d148f00](https://github.com/wanteddev/wds/commit/d148f00391e4508bebb1df21b56f3e1cea766851))
- **wds-theme:** 빌드 오류 수정 ([dc3b275](https://github.com/wanteddev/wds/commit/dc3b275b9e77363d7bb87e514f476045f39b8772))

### Features

- 디자인시스템 자체 엔진 개발 ([#7](https://github.com/wanteddev/wds/issues/7)) ([560e5c2](https://github.com/wanteddev/wds/commit/560e5c220e7e3def3b85b1ef8f80dfc992545373))
