'use client';
import { Box, Divider, Thumbnail } from '@wanteddev/wds';

import { Heading2 } from '@/features/docs/components/mdx/section/layout';
import { getImageUrl } from '@/helpers/image';

import VariantGrid from './variant-grid';
import { linkStyle } from './style';

const FoundationsTypography = () => {
  return (
    <>
      <Divider
        color="semantic.line.normal.neutral"
        sx={{ '&&': { marginBlock: '40px 32px' } }}
      />

      <Heading2 content="Basic typography" />

      <p>
        원티드랩에서는 일본어 서비스도 함께 대응하기 때문에, One Design
        System에서 기본 글꼴로 한국어, 영어, 일본어를 지원하는{' '}
        <Box
          as="a"
          href="https://github.com/orioncactus/pretendard"
          target="_blank"
          rel="noopener noreferrer"
          sx={linkStyle}
        >
          Pretendard JP
        </Box>
        를 사용하고 있습니다.
      </p>

      <Thumbnail
        src={getImageUrl('/foundations/typography/Image.png')}
        alt="Pretendard JP"
        aria-hidden
        radius
        border
        sx={{
          aspectRatio: '390 / 73',
          marginTop: '32px',
        }}
      />

      <Heading2 content="Word break" sx={{ marginTop: '120px' }} />

      <p>
        원티드랩에서는 개발 시 텍스트가 음절별로 나뉘어서 줄바꿈이 됩니다.
        따라서 디자인을 하며 별도로 줄바꿈을 하지 않아도 괜찮습니다.
      </p>

      <Thumbnail
        src={getImageUrl('/foundations/typography/Image-1.png')}
        alt="Word break"
        aria-hidden
        ratio="21:9"
        radius
        border
        sx={{
          marginTop: '32px',
        }}
      />

      <Heading2 content="Style" sx={{ marginTop: '120px' }} />

      <VariantGrid />
    </>
  );
};

export default FoundationsTypography;
