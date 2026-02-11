'use client';

import { Box, Divider } from '@wanteddev/wds';

import { Heading2 } from '../mdx/section/layout';

import GithubRelease from './github-release';

const ReleaseNote = () => {
  return (
    <>
      <Divider
        color="semantic.line.normal.neutral"
        sx={{ '&&': { marginBlock: '40px 32px' } }}
      />

      <Heading2 content="Semantic versioning" />

      <p>
        몽타주의 Major 업데이트는 모든 플랫폼(Web, iOS, Android)이 동일한
        버전으로 6월, 12월에 정기 릴리즈될 수 있으며 Minor 및 Patch 업데이트는
        각 플랫폼의 특성과 요구사항에 맞춰 독립적으로 관리되어 필요에 따라
        유연하게 배포됩니다.
      </p>

      <Box as="ul" sx={{ '&&': { gap: '24px', marginBlock: '32px 40px' } }}>
        <li>
          <strong>Major update(X.0.0)</strong>
          <br />
          디자인 시스템의 구조적 변경, 컴포넌트 구조 개선 및 재설계, Breaking
          Change 포함 된 업데이트 내용이 포함됩니다.
        </li>
        <li>
          <strong>Minor update(x.Y.0)</strong>
          <br />
          새로운 아이콘 추가, 컬러 팔레트 확장, 하위 호환성이 유지되는 신규
          컴포넌트 추가, 기존 기능 개선이 포함됩니다.
        </li>
        <li>
          <strong>Patch update(x.y.Z)</strong>
          <br />
          버그 수정, 성능 개선, 문서 오류 수정, 플랫폼 별 독립적 업데이트가
          포함됩니다.
        </li>
      </Box>

      <p>
        디자인 시스템의 구조적 변경, 컴포넌트 구조 개선 및 재설계, Breaking
        Change 포함 된 업데이트 내용이 포함됩니다.
      </p>

      <Divider color="semantic.line.normal.neutral" />

      <Heading2 content="Latest update" />

      <GithubRelease />
    </>
  );
};

export default ReleaseNote;
