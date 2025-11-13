import { Box, FlexBox, Typography } from '@wanteddev/wds';

import { guideIndexStyle, guideLinkStyle } from './style';

const Steps = () => {
  return (
    <FlexBox flexDirection="column" gap="20px">
      <FlexBox flexDirection="column" gap="4px">
        <Typography
          as="p"
          variant="body1"
          weight="bold"
          color="semantic.label.normal"
        >
          디자이너를 위한 가이드
        </Typography>
        <Typography
          as="p"
          variant="body2-reading"
          weight="regular"
          color="semantic.label.neutral"
        >
          디자이너들은 사용자에게 일관적인 UX 경험을 제공하며
          <br />
          신속하게 개발할 수 있도록 기본 정책이 정해진 컴포넌트를 제공합니다.
        </Typography>
      </FlexBox>

      <FlexBox
        role="list"
        flexDirection="column"
        gap="16px"
        sx={{ paddingBlock: '24px' }}
      >
        <FlexBox role="listitem" gap="8px">
          <Typography
            variant="label1"
            weight="bold"
            color="semantic.background.normal.normal"
            align="center"
            sx={guideIndexStyle}
          >
            1
          </Typography>

          <Typography
            variant="label1"
            weight="medium"
            color="semantic.label.neutral"
          >
            몽타주의 가이드 문서와 Figma의{' '}
            <Box
              as="a"
              href="https://www.figma.com/community/file/1355516515676178246"
              target="_blank"
              rel="noopener noreferrer"
              sx={guideLinkStyle}
            >
              디자인 라이브러리
            </Box>
            를 함께 보며 학습해보세요.
          </Typography>
        </FlexBox>

        <FlexBox role="listitem" gap="8px">
          <Typography
            variant="label1"
            weight="bold"
            color="semantic.background.normal.normal"
            align="center"
            sx={guideIndexStyle}
          >
            2
          </Typography>

          <Typography
            variant="label1"
            weight="medium"
            color="semantic.label.neutral"
          >
            가이드 문서와 디자인 라이브러리의 보라색 영역은 Slot(Customize)
            영역을 표현합니다.
          </Typography>
        </FlexBox>

        <FlexBox role="listitem" gap="8px">
          <Typography
            variant="label1"
            weight="bold"
            color="semantic.background.normal.normal"
            align="center"
            sx={guideIndexStyle}
          >
            3
          </Typography>

          <Typography
            variant="label1"
            weight="medium"
            color="semantic.label.neutral"
          >
            사이즈와 같이 규격에 대한 정보는 빨간색으로 인지할 수 있습니다.
          </Typography>
        </FlexBox>

        <FlexBox role="listitem" gap="8px">
          <Typography
            variant="label1"
            weight="bold"
            color="semantic.background.normal.normal"
            align="center"
            sx={guideIndexStyle}
          >
            4
          </Typography>

          <Typography
            variant="label1"
            weight="medium"
            color="semantic.label.neutral"
          >
            다수 활용하거나 추가가 필요할 것 같은 기능이 있다면 의견을
            남겨주세요.
          </Typography>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default Steps;
