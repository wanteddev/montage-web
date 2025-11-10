'use client';
import { Divider, Thumbnail } from '@wanteddev/wds';

import { Heading2 } from '@/features/docs/components/mdx/section/layout';

import VariantGrid from './variant-grid';

const FoundationsTypography = () => {
  return (
    <>
      <Divider
        color="semantic.line.normal.neutral"
        sx={{ '&&': { marginBlock: '48px 56px' } }}
      />

      <Heading2 content="Basic typography" />

      <p>
        원티드랩에서는 일본어 서비스도 함께 대응하기 때문에, One Design
        System에서 기본 글꼴로 한국어, 영어, 일본어를 지원하는 Pretendard JP를
        사용하고 있습니다.
      </p>

      <Thumbnail
        src="/foundations/typography/Image.png"
        alt="Pretendard JP"
        radius
        border
        sx={{
          aspectRatio: '390 / 73',
          marginTop: '40px',
        }}
      />

      <Divider color="semantic.line.normal.alternative" />

      <Heading2 content="Work break" />

      <p>
        원티드랩에서는 개발 시 텍스트가 음절별로 나뉘어서 줄바꿈이 됩니다.
        따라서 디자인을 하며 별도로 줄바꿈을 하지 않아도 괜찮습니다.
      </p>

      <Thumbnail
        src="/foundations/typography/Image-1.png"
        alt="Work break"
        ratio="21:9"
        radius
        border
        sx={{
          marginTop: '40px',
        }}
      />

      <Divider color="semantic.line.normal.alternative" />

      <Heading2 content="Style" />

      <VariantGrid />
    </>
  );
};

export default FoundationsTypography;
