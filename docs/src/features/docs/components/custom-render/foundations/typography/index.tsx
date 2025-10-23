import { Divider, FlexBox, Thumbnail, Typography } from '@wanteddev/wds';

import {
  Heading2,
  Heading3,
} from '@/features/docs/components/mdx/section/layout';

import VariantGrid from './variant-grid';
import Preview from './preview';
import { downloadResourceStyle } from './style';

const FoundationsTypography = () => {
  return (
    <>
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

      <Heading2 content="Style" />

      <VariantGrid />

      <Divider color="semantic.line.normal.alternative" />

      <Heading2 content="Preview" sx={{ marginTop: '40px' }} />

      <p>
        Caption부터 Display까지 실제 적용되는 크기로 시스템 타이포를 미리 볼 수
        있습니다. 적용되는 시스템 폰트를 비교해보세요.
      </p>

      <Preview />

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

      <Heading2 content="Use case" />

      <p>
        원티드랩의 시스템 타이포그래피는 기본적으로 각 상황에 맞는 사용 예시가
        존재합니다. 하지만 이를 완전히 지킬 수 없는 상황도 있기 때문에 가능한
        가이드라인대로 사용하는 것을 권장하되, 상황에 적합한 크기가 있는
        스타일을 사용할 수 있습니다.
      </p>

      <Heading3 content="Display 1, 2" sx={{ marginTop: '40px' }} />

      <Thumbnail
        src="/foundations/typography/Image-2.png"
        alt="Use case for Display 1, 2"
        radius
        border
        sx={{
          aspectRatio: '39 / 16',
          marginBottom: '64px',
        }}
      />

      <Heading3 content="Title 1, 2, 3" />

      <Thumbnail
        src="/foundations/typography/Image-3.png"
        alt="Use case for Title 1, 2, 3"
        radius
        border
        sx={{
          aspectRatio: '39 / 16',
          marginBottom: '64px',
        }}
      />

      <Heading3 content="Heading 1, 2" />

      <Thumbnail
        src="/foundations/typography/Image-4.png"
        alt="Use case for Heading 1, 2"
        radius
        sx={{
          aspectRatio: '39 / 16',
          marginBottom: '64px',
        }}
      />

      <Heading3 content="Headline 1, 2" />

      <Thumbnail
        src="/foundations/typography/Image-5.png"
        alt="Use case for Headline 1, 2"
        radius
        border
        sx={{
          aspectRatio: '39 / 16',
          marginBottom: '64px',
        }}
      />

      <Heading3 content="Body 1, 2" />

      <Thumbnail
        src="/foundations/typography/Image-6.png"
        alt="Use case for Body 1, 2"
        radius
        border
        sx={{
          aspectRatio: '39 / 16',
          marginBottom: '64px',
        }}
      />

      <Heading3 content="Label 1, 2" />

      <Thumbnail
        src="/foundations/typography/Image-7.png"
        alt="Use case for Label 1, 2"
        radius
        border
        sx={{
          aspectRatio: '39 / 16',
          marginBottom: '64px',
        }}
      />

      <Heading3 content="Caption 1, 2" />

      <Thumbnail
        src="/foundations/typography/Image-8.png"
        alt="Use case for Caption 1, 2"
        radius
        border
        sx={{
          aspectRatio: '39 / 16',
        }}
      />

      <Divider color="semantic.line.normal.alternative" />

      <Heading2 content="Resource" />

      {/* TODO: 다운로드 링크 추가 */}
      <FlexBox
        sx={downloadResourceStyle}
        gap="16px"
        alignItems="center"
        as="a"
        href="/#"
        target="_blank"
        rel="noreferrer"
      >
        <FlexBox flexDirection="column" gap="2px">
          <Typography
            variant="heading2"
            weight="bold"
            color="semantic.label.normal"
          >
            Pretendard JP
          </Typography>

          <Typography
            variant="label1"
            weight="medium"
            color="semantic.label.neutral"
            sx={(theme) => ({
              opacity: theme.opacity[88],
            })}
          >
            시스템 폰트 다운로드
          </Typography>
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default FoundationsTypography;
