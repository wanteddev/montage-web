export const DESIGN_INTENT = [
  '진단/테스트 흐름의 단일 질문 화면입니다. 사용자가 한 화면에서 하나의 질문에만 집중하도록 좌우 여백을 비워두고 컨테이너 폭을 좁게(400px) 잡았습니다.',
  '상단 GNB는 로고와 우측의 회원가입/로그인 CTA만 두는 슬림 GNB로, 일반 메인 페이지의 메뉴·검색·알림을 제거해 진단 진행에 방해가 되지 않게 합니다.',
  '본문 최상단에는 ProgressIndicator + "05 / 10" 텍스트로 진행도를 명확히 보여줍니다. 사용자가 남은 단계 수를 즉시 인지하도록 합니다.',
  '질문 텍스트는 SectionHeader(Title)로 가운데 정렬, Heading 1 / Bold 22px로 시각 위계 최상단을 차지합니다.',
  '질문 의미를 보강하는 Emoji 일러스트를 가운데 배치해 정보성+감성적 톤을 동시에 전달합니다.',
  '답변 옵션은 풀폭 Button(48px)을 세로로 12px 간격으로 쌓아 손쉽게 비교·탭할 수 있게 합니다. 정답이 없는 문항이라 두 옵션 모두 동일한 시각 위계로 둡니다.',
  'Footer는 home/joblist 화면과 동일한 구성으로 일관성을 유지합니다. 진단 흐름에서도 회사 정보·문의 링크 접근성을 보장합니다.',
];

export const TOKEN_USAGE = [
  {
    token: 'layout.spacingX.globalGutter',
    value: '20px',
    usage: 'GNB·Footer의 좌우 거터',
  },
  {
    token: 'layout.spacingY.marginTop.contentMarginTop',
    value: '40px',
    usage: 'GNB 아래 본문 시작 마진',
  },
  {
    token: 'layout.spacingY.gap.componentGap',
    value: '12px',
    usage: '답변 Button 사이 세로 간격',
  },
  {
    token: 'semantic.label.normal',
    value: '#171719',
    usage: '질문 제목 / GNB 로고 영역',
  },
  {
    token: 'semantic.label.alternative',
    value: 'rgba(55, 56, 60, 0.61)',
    usage: '진행도 텍스트 / Footer 회사정보 텍스트',
  },
  {
    token: 'semantic.line.normal.neutral',
    value: 'rgba(112, 115, 124, 0.16)',
    usage: 'GNB 하단 / Footer 상단 디바이더',
  },
  {
    token: 'semantic.primary.normal',
    value: '#0066FF',
    usage: 'Progress 진행 바 컬러 / 회원가입·로그인 CTA',
  },
];

export const COMPONENT_USAGE = [
  {
    name: 'Box · FlexBox · Typography (@wanteddev/wds)',
    usage: '레이아웃 컨테이너와 텍스트. sx prop으로 토큰을 직접 참조합니다.',
  },
  {
    name: 'ProgressIndicator (@wanteddev/wds)',
    usage:
      '진행도 표시. percent prop으로 현재 진행 비율(예: 5/10 → 50)을 넘기고, 위에 "05 / 10" 텍스트를 별도로 노출합니다.',
  },
  {
    name: 'SectionHeader (@wanteddev/wds)',
    usage:
      '질문 텍스트. Heading 1 / Bold 22px가 자동 적용되며 가운데 정렬을 위해 textAlign sx로 처리합니다.',
  },
  {
    name: 'Button (@wanteddev/wds)',
    usage:
      '답변 옵션 2개. variant="outlined" color="assistive" size="medium"로 풀폭 노출하고, 세로로 12px 간격으로 쌓습니다. 선택 시 variant="solid"로 토글되는 동작을 가정합니다.',
  },
  {
    name: 'Button (@wanteddev/wds)',
    usage:
      '슬림 GNB 우측 회원가입/로그인 CTA. variant="outlined" size="small".',
  },
  {
    name: 'Divider (@wanteddev/wds)',
    usage: 'Footer 회사정보 사이 vertical 구분선과 메인 가로 디바이더.',
  },
  {
    name: 'IconLogo* (@wanteddev/wds-icon)',
    usage:
      'Footer 하단 SNS·앱스토어 진입 버튼 (Instagram, Youtube, Facebook, NaverBlog, Apple, GooglePlay).',
  },
];

export const TEST_SOURCE_CODE = `import { Box, Button, Divider, FlexBox, IconButton, ProgressIndicator, SectionHeader, Typography, css } from '@wanteddev/wds';
import { IconLogoApple, IconLogoFacebook, IconLogoGooglePlay, IconLogoInstagram, IconLogoNaverBlog, IconLogoYoutube } from '@wanteddev/wds-icon';
import { Fragment } from 'react';

// ------- 데이터 -------
const STEP_CURRENT = 5;
const STEP_TOTAL = 10;
const QUESTION = '새로운 아이디어가 생기면 나는?';
const ANSWERS = ['충분히 검토하고 완성도를 높인다.', '일단 빠르게 내보낸다.'];
const QUESTION_EMOJI = '🐻';

const FOOTER_MENU_ITEMS = [
  { label: '기업소개', bold: false },
  { label: '광고문의', bold: false },
  { label: '고객센터', bold: false },
  { label: '이용약관', bold: false },
  { label: '블로그', bold: false },
  { label: '개인정보 처리방침', bold: true },
];

const FOOTER_INFO_GROUPS = [
  ['(주)원티드랩', '대표이사 이복기'],
  ['서울특별시 송파구 올림픽로 300, 롯데월드타워 35층', '전화번호: 02-539-7118'],
  ['사업자등록번호: 299-86-00021', '통신판매번호: 2020-서울송파-3147'],
];

const FOOTER_INQUIRY_LINKS = ['채용서비스 문의', '원티드스페이스 문의', '원티드긱스 문의', '프리온보딩 문의', '취업지원시스템 문의', 'IR 문의'];

// ------- 스타일 -------
// Layout tokens (lg):
//   globalGutter 20 / contentMarginTop 40
//   componentGap 12

const pageWrapperStyle = css\`
  width: 1440px;
  background-color: var(--semantic-background-normal-normal);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
\`;

const gnbWrapperStyle = css\`
  position: relative;
  width: 100%;
  border-bottom: 1px solid var(--semantic-line-normal-neutral);
  background-color: var(--semantic-background-normal-normal);
\`;

const gnbContentStyle = css\`
  padding: 14px 20px;
\`;

const logoStyle = css\`
  display: inline-flex;
  align-items: center;
  height: 32px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 700;
  font-size: 24px;
  letter-spacing: -0.04em;
  color: var(--semantic-primary-normal);
\`;

const bodyContainerStyle = css\`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 60px 20px 80px;
\`;

const questionContainerStyle = css\`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 48px;
  align-items: stretch;
\`;

const progressContainerStyle = css\`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
\`;

const stepTextStyle = css\`
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.05em;
\`;

const questionTitleStyle = css\`
  text-align: center;
\`;

const emojiStyle = css\`
  width: 160px;
  height: 160px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 120px;
  line-height: 1;
\`;

const answerListStyle = css\`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
\`;

const answerButtonStyle = css\`
  width: 100%;
  justify-content: center;
\`;

const footerWrapperStyle = css\`
  position: relative;
  width: 100%;
  border-top: 1px solid var(--semantic-line-normal-neutral);
  background-color: var(--semantic-background-normal-normal);
\`;

const footerContainerStyle = css\`
  max-width: 1440px;
  padding: 40px 20px 24px;
\`;

const footerLogoStyle = css\`
  display: inline-flex;
  align-items: center;
  height: 32px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 700;
  font-size: 24px;
  letter-spacing: -0.04em;
  color: var(--semantic-primary-normal);
\`;

const footerInquiryLinkStyle = css\`
  opacity: 0.61;
\`;

// ------- 슬림 GNB (테스트 전용) -------
const Gnb = () => (
  <Box as="header" sx={gnbWrapperStyle}>
    <FlexBox alignItems="center" justifyContent="space-between" sx={gnbContentStyle}>
      <Box as="span" sx={logoStyle} aria-label="wanted">wanted</Box>
      <Button variant="outlined" color="primary" size="small">
        회원가입/로그인
      </Button>
    </FlexBox>
  </Box>
);

// ------- Footer -------
const Footer = () => (
  <Box as="footer" sx={footerWrapperStyle}>
    <FlexBox flexDirection="column" gap="32px" sx={footerContainerStyle}>
      <FlexBox flexDirection="column" gap="28px">
        <FlexBox justifyContent="space-between" alignItems="flex-start">
          <Box as="span" sx={footerLogoStyle} aria-label="wanted">wanted</Box>
          <FlexBox gap="32px">
            {FOOTER_MENU_ITEMS.map(({ label, bold }) => (
              <Typography key={label} variant="body1" weight={bold ? 'bold' : 'medium'} color="semantic.label.normal">
                {label}
              </Typography>
            ))}
          </FlexBox>
        </FlexBox>
        <FlexBox flexDirection="column" gap="28px">
          <FlexBox flexDirection="column" gap="8px">
            {FOOTER_INFO_GROUPS.map((group, gi) => (
              <FlexBox key={gi} gap="8px" alignItems="center">
                {group.map((text, i) => (
                  <Fragment key={text}>
                    <Typography variant="label2" weight="medium" color="semantic.label.alternative">
                      {text}
                    </Typography>
                    {i < group.length - 1 && <Divider vertical />}
                  </Fragment>
                ))}
              </FlexBox>
            ))}
          </FlexBox>
          <FlexBox gap="24px" sx={{ flexWrap: 'wrap' }}>
            {FOOTER_INQUIRY_LINKS.map((label) => (
              <Typography key={label} variant="label2" weight="bold" color="semantic.label.normal" sx={footerInquiryLinkStyle}>
                {label}
              </Typography>
            ))}
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <FlexBox flexDirection="column" gap="20px">
        <Divider />
        <FlexBox justifyContent="space-between" alignItems="center">
          <Typography variant="label2" weight="medium" color="semantic.label.alternative">
            © 2026 Wanted Lab, Inc.
          </Typography>
          <FlexBox gap="16px">
            <IconButton variant="normal" aria-label="instagram"><IconLogoInstagram /></IconButton>
            <IconButton variant="normal" aria-label="youtube"><IconLogoYoutube /></IconButton>
            <IconButton variant="normal" aria-label="facebook"><IconLogoFacebook /></IconButton>
            <IconButton variant="normal" aria-label="naver-blog"><IconLogoNaverBlog /></IconButton>
            <IconButton variant="normal" aria-label="apple"><IconLogoApple /></IconButton>
            <IconButton variant="normal" aria-label="google-play"><IconLogoGooglePlay /></IconButton>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  </Box>
);

// ------- 메인 화면 -------
const Demo = () => {
  const percent = (STEP_CURRENT / STEP_TOTAL) * 100;
  const stepLabel = String(STEP_CURRENT).padStart(2, '0') + ' / ' + String(STEP_TOTAL).padStart(2, '0');

  return (
    <Box sx={pageWrapperStyle}>
      <Gnb />

      <Box sx={bodyContainerStyle}>
        <Box sx={questionContainerStyle}>
          {/* 진행도 */}
          <Box sx={progressContainerStyle}>
            <Typography
              variant="label2"
              weight="medium"
              color="semantic.label.alternative"
              sx={stepTextStyle}
            >
              {stepLabel}
            </Typography>
            <ProgressIndicator percent={percent} />
          </Box>

          {/* 질문 + 일러스트 */}
          <FlexBox flexDirection="column" gap="32px" alignItems="stretch">
            <SectionHeader sx={questionTitleStyle}>{QUESTION}</SectionHeader>
            <Box sx={emojiStyle} aria-hidden>{QUESTION_EMOJI}</Box>
          </FlexBox>

          {/* 답변 옵션 */}
          <Box sx={answerListStyle}>
            {ANSWERS.map((answer) => (
              <Button
                key={answer}
                variant="outlined"
                color="assistive"
                size="medium"
                sx={answerButtonStyle}
              >
                {answer}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Demo;
`;
