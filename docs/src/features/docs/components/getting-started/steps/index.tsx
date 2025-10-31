import { FlexBox, Typography } from '@wanteddev/wds';

import { GUIDE_ITEMS } from './constants';
import { guideIndexStyle, listStyle } from './style';

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

      <FlexBox flexDirection="column" gap="16px" sx={{ paddingBlock: '24px' }}>
        {GUIDE_ITEMS.map((item, idx) => (
          <FlexBox key={idx} as="ul" sx={listStyle}>
            <Typography
              variant="label1"
              weight="bold"
              color="semantic.background.normal.normal"
              align="center"
              sx={guideIndexStyle}
            >
              {idx + 1}
            </Typography>

            <Typography
              as="li"
              variant="label1"
              weight="medium"
              color="semantic.label.neutral"
              sx={{ listStyle: 'none' }}
            >
              {item}
            </Typography>
          </FlexBox>
        ))}
      </FlexBox>
    </FlexBox>
  );
};

export default Steps;
