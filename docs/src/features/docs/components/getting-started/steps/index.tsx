import { FlexBox, Typography } from '@wanteddev/wds';

const Steps = () => {
  return (
    <FlexBox flexDirection="column" gap="4px">
      <Typography
        as="p"
        variant="body2-reading"
        weight="medium"
        color="semantic.label.neutral"
      >
        디자이너들은 사용자에게 일관적인 UX 경험을 제공하며
        <br />
        신속하게 개발할 수 있도록 기본 정책이 정해진 컴포넌트를 제공합니다.
      </Typography>

      <FlexBox flexDirection="column" gap="16px" sx={[{ paddingTop: '24px' }]}>
        <Typography
          as="p"
          variant="body2"
          weight="bold"
          color="semantic.label.normal"
        >
          디자이너를 위한 가이드
        </Typography>

        <FlexBox
          as="ul"
          flexDirection="column"
          gap="6px"
          sx={{ marginBottom: '0px !important' }}
        >
          <li>
            몽타주의 가이드 문서와 Figma의 디자인 라이브러리를 함께 보며
            학습해보세요.
          </li>
          <li>
            가이드 문서와 디자인 라이브러리의 보라색 영역은 Slot(Customize)
            영역을 표현합니다.
          </li>
          <li>
            사이즈와 같이 규격에 대한 정보는 빨간색으로 인지할 수 있습니다.
          </li>
          <li>
            필요한 스펙이나 다수 활용될 것 같은 부분이 발견된다면 의견을
            남겨주세요.
          </li>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default Steps;
