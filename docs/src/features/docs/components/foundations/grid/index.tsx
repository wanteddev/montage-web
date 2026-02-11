'use client';
import { Box, Divider, Thumbnail } from '@wanteddev/wds';

import { getImageUrl } from '@/helpers/image';

import { Heading2, Heading3 } from '../../mdx/section/layout';

import BreakpointGrid from './breakpoint-grid';
import ArtboardSizeGrid from './artboard-size-grid';

const FoundationsGrid = () => {
  return (
    <>
      <Divider
        color="semantic.line.normal.neutral"
        sx={{ '&&': { marginBlock: '40px 32px' } }}
      />

      <Heading2 content="Artboard size" />

      <Box as="p" sx={{ marginBottom: '40px' }}>
        원티드랩에서는 일반적으로 사용할 수 있는 웹, 앱 환경에 맞는 화면을 모두
        대응하고 있습니다. 디자이너는 일반적으로 해상도 별 모든 화면을 디자인 할
        필요 없이 아래 표시 된 대표 규격만 설계합니다.
      </Box>

      <ArtboardSizeGrid />

      <Heading2 sx={{ marginTop: '120px' }} content="Breakpoint" />

      <BreakpointGrid />

      <Heading2 sx={{ marginTop: '120px' }} content="Spacing" />

      <p>
        예측 가능한 디자인 규칙 및 개발자와의 원활한 소통을 위해, 4배수 간격으로
        구성하는 것을 권장합니다. 단, 시각 보정이 필요할 시 기본적으로 2px
        단위로 움직이지만 불가피할 시 1px씩 조정할 수 있습니다.
      </p>

      <Thumbnail
        src={getImageUrl('/foundations/grid/Image.png')}
        alt="Spacing"
        aria-hidden
        radius
        border
        ratio="21:9"
        sx={{
          marginTop: '24px',
        }}
      />

      <Heading2 sx={{ marginTop: '120px' }} content="Layout" />

      <p>
        20px의 간격을 두며, 화면의 너비에 맞게 유연하게 대응할 수 있는 컬럼
        그리드를 사용합니다. 그리드는 해상도에 따라 자유롭게 컬럼을 병합하여
        사용할 수 있습니다.
      </p>

      <Heading3
        content="Mobile"
        sx={{ '&&': { marginTop: '40px', marginBottom: '12px' } }}
      />

      <p>2단 컬럼 그리드를 사용하며 20px의 간격을 둡니다.</p>

      <Thumbnail
        src={getImageUrl('/foundations/grid/Image-1.png')}
        alt="Mobile layout"
        aria-hidden
        radius
        border
        ratio="21:9"
        sx={{
          marginTop: '24px',
          marginBottom: '0px',
        }}
      />

      <Divider
        color="semantic.line.normal.neutral"
        sx={{ '&&': { marginBlock: '32px' } }}
      />

      <Heading3
        content="Tablet"
        sx={{ '&&': { marginTop: '0px', marginBottom: '12px' } }}
      />

      <p>3단 컬럼 그리드를 사용하며 컬럼을 묶어서 사용할 수 있습니다.</p>

      <Thumbnail
        src={getImageUrl('/foundations/grid/Image-2.png')}
        alt="Tablet layout"
        aria-hidden
        radius
        border
        ratio="21:9"
        sx={{
          marginTop: '24px',
          marginBottom: '0px',
        }}
      />

      <Divider
        color="semantic.line.normal.neutral"
        sx={{ '&&': { marginBlock: '32px' } }}
      />

      <Heading3
        content="Desktop"
        sx={{ '&&': { marginTop: '0px', marginBottom: '12px' } }}
      />

      <p>12단 컬럼 그리드를 사용하며 컬럼을 묶어서 사용할 수 있습니다.</p>

      <Thumbnail
        src={getImageUrl('/foundations/grid/Image-3.png')}
        alt="Desktop layout"
        aria-hidden
        radius
        border
        ratio="21:9"
        sx={{
          marginTop: '24px',
        }}
      />
    </>
  );
};

export default FoundationsGrid;
