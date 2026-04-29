export const DESIGN_INTENT = [
  '원티드 메인 화면을 PC 1440 기준으로 구현한 풀 화면 레이아웃입니다. 큐레이션된 콘텐츠 섹션을 카드 그리드로 묶어 보여주는 콘텐츠-퍼스트 홈 화면 패턴입니다.',
  'GNB는 좌측 로고와 카테고리 메뉴, 우측 검색·알림·프로필·기업 서비스 CTA로 구성됩니다. Body 2 / SemiBold 15px, 메뉴 그룹 간 40px 간격으로 시각 위계가 명확합니다.',
  'GNB 직하단에는 Shortcut 바를 두어 10개의 주요 서비스(채용 공고·이력서 에이전트·면접 제안 등) 진입점을 한 줄에 노출합니다. 알림이 있는 항목은 Push Badge(99+ / N)로 표시합니다.',
  '본문은 4개 섹션이 세로로 쌓이며 섹션 사이 간격은 Layout 토큰 contentGap(60px)로 일정합니다. SectionHeader는 좌측 제목과 우측 "전체보기" TextButton으로 구성하고, sectionHeaderMarginBottom(20px)으로 내부 그리드와 간격을 둡니다.',
  '"합격 가능성 높은 포지션" 섹션은 합격보상금 오버레이 + 북마크 토글 + ContentBadge로 AI 예측 정확도를 함께 노출하고, 마지막 카드는 경력 인증 CTA를 담는 빈 카드로 변주를 줍니다.',
  '"지금 주목할 소식" 섹션은 3컬럼의 큰 이미지 카드로 콘텐츠를 강조합니다. 하단 그라데이션 위에 흰 텍스트로 제목·부제를 얹고, 영상 콘텐츠는 IconPlay를 가운데 배치합니다.',
  '"AI 추천 포지션" / "최근 본 포지션" 섹션은 동일한 5컬럼 카드 그리드 패턴으로, 사용자에게 익숙한 형식을 반복해 인지 부담을 낮춥니다.',
  '본문 마지막 섹션과 Footer 사이는 screenMarginBottom(160px)으로 끝맺음을 명확히 표현합니다. Footer는 회사 정보·문의 링크·SNS 액션을 한 번에 노출합니다.',
];

export const TOKEN_USAGE = [
  {
    token: 'layout.lg.spacingX.globalGutter',
    value: '20px',
    usage: 'GNB·본문·Footer의 좌우 거터',
  },
  {
    token: 'layout.lg.spacingY.marginTop.contentMarginTop',
    value: '40px',
    usage: 'GNB 아래, 첫 섹션 시작 위 마진',
  },
  {
    token: 'layout.lg.spacingY.marginTop.sectionHeaderMarginBottom',
    value: '20px',
    usage: '섹션 제목과 그리드 사이 간격',
  },
  {
    token: 'layout.lg.spacingY.gap.contentGap',
    value: '60px',
    usage: '섹션 사이 세로 간격',
  },
  {
    token: 'layout.lg.spacingX.gap.cardGap',
    value: '20px',
    usage: '카드 그리드 컬럼·로우 간 간격',
  },
  {
    token: 'layout.lg.spacingY.gap.textGap',
    value: '6px',
    usage: '카드 내 제목·캡션 사이 간격',
  },
  {
    token: 'layout.lg.spacingY.marginBottom.screenMarginBottom',
    value: '160px',
    usage: '본문 마지막 섹션과 Footer 사이 간격',
  },
  {
    token: "radius['30']",
    value: '12px',
    usage: '카드 썸네일과 ListCard 썸네일 모서리',
  },
  {
    token: 'semantic.label.normal',
    value: '#171719',
    usage: '섹션 제목 / 카드 제목 / GNB 메뉴 라벨',
  },
  {
    token: 'semantic.label.alternative',
    value: 'rgba(55, 56, 60, 0.61)',
    usage: '카드 캡션 / Footer 회사정보 텍스트',
  },
  {
    token: 'semantic.static.white',
    value: '#FFFFFF',
    usage: '카드 오버레이 캡션·북마크 아이콘 컬러',
  },
  {
    token: 'semantic.line.normal.neutral',
    value: 'rgba(112, 115, 124, 0.16)',
    usage: 'GNB 하단 / Footer 상단 디바이더',
  },
];

export const COMPONENT_USAGE = [
  {
    name: 'Box · FlexBox · Typography (@wanteddev/wds)',
    usage: '레이아웃 컨테이너와 텍스트. sx prop으로 토큰을 직접 참조합니다.',
  },
  {
    name: 'SectionHeader (@wanteddev/wds)',
    usage:
      '본문 섹션의 제목. SectionHeader는 H2 시멘틱이며, 우측에 TextButton "전체보기"와 함께 sectionHeaderMarginBottom 토큰으로 그리드와 간격을 둡니다.',
  },
  {
    name: 'Card · CardThumbnail · CardThumbnailContent · CardContent · CardTitle · CardCaption (@wanteddev/wds)',
    usage:
      '5컬럼 카드 그리드의 기본 단위. CardThumbnail의 leadingContent에 overlay 캡션(합격보상금, 조회 시점, AI 추천 등), trailingContent에 IconBookmark 토글을 배치합니다.',
  },
  {
    name: 'ContentBadge (@wanteddev/wds)',
    usage:
      '"합격 가능성 높은 포지션" 섹션에서 카드 하단에 AI 예측 정확도(예: AI 예측 99%)를 표시. color="accent" size="xsmall" variant="solid" 사용.',
  },
  {
    name: 'TextButton (@wanteddev/wds)',
    usage:
      'SectionHeader 우측 "전체보기"(color="assistive")와, CTA 카드의 "경력 인증하기" 버튼(color="primary" + IconArrowRight trailingContent)에 사용.',
  },
  {
    name: 'Button · IconButton · Avatar · AvatarButton (@wanteddev/wds)',
    usage: 'GNB의 기업 서비스 CTA / 검색·알림 IconButton / 프로필 Avatar.',
  },
  {
    name: 'Divider (@wanteddev/wds)',
    usage: 'Footer 회사정보 사이 vertical 구분선과 메인 가로 디바이더.',
  },
  {
    name: 'IconBookmark · IconArrowRight · IconPlay (@wanteddev/wds-icon)',
    usage:
      '카드 북마크 토글 / CTA 텍스트 버튼 trailing / 영상 콘텐츠 카드 가운데 재생 아이콘.',
  },
  {
    name: 'IconDocumentSearch · IconAgentSearch · IconBusinessBag · IconNavigationCareer · IconCalendarPerson · IconChat · IconGraduation · IconCoins · IconCompany (@wanteddev/wds-icon)',
    usage:
      'Shortcut 바의 10개 주요 서비스 아이콘. 56px 원형 컨테이너 안에 배치하고 알림이 있는 항목은 우측 상단에 Push Badge(99+ 또는 N)를 띄웁니다.',
  },
  {
    name: 'IconSearch · IconBell · IconListCategory (@wanteddev/wds-icon)',
    usage: 'GNB 검색·알림 아이콘과 카테고리 진입 아이콘.',
  },
  {
    name: 'IconLogo* (@wanteddev/wds-icon)',
    usage:
      'Footer 하단 SNS·앱스토어 진입 버튼 (Instagram, Youtube, Facebook, NaverBlog, Apple, GooglePlay).',
  },
];

export const RESEARCH_SOURCE_CODE = `import { Avatar, AvatarButton, Box, Button, Card, CardCaption, CardContent, CardThumbnail, CardThumbnailContent, CardTitle, ContentBadge, Divider, FlexBox, IconButton, SectionHeader, TextButton, Typography, css } from '@wanteddev/wds';
import { IconAgentSearch, IconArrowRight, IconBell, IconBookmark, IconBusinessBag, IconCalendarPerson, IconChat, IconCoins, IconCompany, IconDocumentSearch, IconGraduation, IconListCategory, IconLogoApple, IconLogoFacebook, IconLogoGooglePlay, IconLogoInstagram, IconLogoNaverBlog, IconLogoYoutube, IconNavigationCareer, IconPlay, IconSearch } from '@wanteddev/wds-icon';
import { Fragment } from 'react';

// ------- 데이터 -------
const GNB_MENU_ITEMS = ['채용', '이력서', '교육•이벤트', '콘텐츠', '소셜', '프리랜서', '더보기'];

const SHORTCUTS = [
  { label: '채용 공고', Icon: IconDocumentSearch },
  { label: '이력서 에이전트', Icon: IconAgentSearch },
  { label: '이력서 관리', Icon: IconBusinessBag },
  { label: '커리어 조회', Icon: IconNavigationCareer },
  { label: '지원 현황', Icon: IconCalendarPerson },
  { label: '면접 제안', Icon: IconChat, badge: '99+' },
  { label: '면접 코칭받기', Icon: IconGraduation },
  { label: '북마크', Icon: IconBookmark },
  { label: '직군별 연봉', Icon: IconCoins },
  { label: '원티드 추천 기업', Icon: IconCompany, badge: 'N' },
];

const MATCH_CARDS = [
  { id: 'm-0', overlay: '합격보상금 100만원', title: 'Product Design Lead', caption: '클라썸 · 경력 3-10년', badge: 'AI 예측 99%' },
  { id: 'm-1', overlay: '합격보상금 100만원', title: 'UX/UI 디자이너', caption: '롯데카드 · 경력 3-10년', badge: 'AI 예측 86%' },
  { id: 'm-2', overlay: '합격보상금 100만원', title: '[재택근무] 콘텐츠 디자이너', caption: '웨어러블에이아이 · 경력 3-10년', badge: 'AI 예측 86%' },
  { id: 'm-3', overlay: '합격보상금 100만원', title: 'UX/UI 디자이너 (브랜드 사이트 운영)', caption: '펑타이그레이터차이나 · 경력 3-10년', badge: 'AI 예측 71%' },
];

const NEWS_CARDS = [
  { id: 'n-0', title: \`'일할 맛' 오비맥주편\`, subtitle: '1등 회사는 \\'이게\\' 다르다던데...', accent: 'rgba(115, 90, 0, 0.55)', play: true },
  { id: 'n-1', title: 'CJ 올리브영 신입 / 경력 모집', subtitle: 'No.1 헬스&뷰티 스토어 올리브영과 함께 할 인재를 찾습니다.', accent: 'rgba(91, 114, 77, 0.55)' },
  { id: 'n-2', title: 'LG 전자 대규모 채용!', subtitle: '미래를 만들어갈 멋진 팀을 기다리고 있습니다.', accent: 'rgba(37, 44, 53, 0.55)' },
];

const VIEWED_CARDS = [
  { id: 'v-0', overlay: '3시간 전 조회', title: 'iOS 개발자', caption: '쿠팡 · 경력 5년 이상' },
  { id: 'v-1', overlay: '어제 조회', title: '서비스 기획자', caption: '토스 · 경력 3~7년' },
  { id: 'v-2', overlay: '2일 전 조회', title: '백엔드 개발자', caption: '네이버 · 경력 3년 이상' },
  { id: 'v-3', overlay: '3일 전 조회', title: 'UX 디자이너', caption: '오늘의집 · 경력 3년 이상' },
  { id: 'v-4', overlay: '1주일 전 조회', title: 'AI 엔지니어', caption: '카카오 · 경력 무관' },
];

const RECOMMEND_CARDS = [
  { id: 'r-0', overlay: 'AI 추천', title: 'Senior Backend Engineer', caption: '카카오뱅크 · 경력 5년 이상' },
  { id: 'r-1', overlay: 'AI 추천', title: 'Product Manager', caption: '쏘카 · 경력 3-7년' },
  { id: 'r-2', overlay: 'AI 추천', title: 'iOS Developer', caption: '당근 · 경력 무관' },
  { id: 'r-3', overlay: 'AI 추천', title: '데이터 사이언티스트', caption: '배달의민족 · 경력 2-5년' },
  { id: 'r-4', overlay: 'AI 추천', title: 'Frontend Engineer', caption: '토스 · 경력 3년 이상' },
];

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
//   globalGutter 20 / contentMarginTop 40 / sectionHeaderMarginBottom 20
//   contentGap 60 / cardGap 20 / textGap 6 / screenMarginBottom 160
// Radius tokens: radius/30 = 12px

const pageWrapperStyle = css\`
  width: 1440px;
  background-color: var(--semantic-background-normal-normal);
  border-radius: 20px;
  overflow: hidden;
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
  max-width: 1440px;
  padding: 40px 111px 160px;
  display: flex;
  flex-direction: column;
  gap: 60px;
\`;

const shortcutContainerStyle = css\`
  padding: 24px 0 12px;
  display: flex;
  justify-content: center;
\`;

const shortcutListStyle = css\`
  display: flex;
  align-items: flex-start;
\`;

const shortcutItemStyle = css\`
  width: 117.78px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
\`;

const shortcutIconWrapperStyle = css\`
  position: relative;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: var(--semantic-fill-normal);
  font-size: 28px;
  color: var(--semantic-label-normal);
\`;

const shortcutBadgeStyle = (isNegative) => css\`
  position: absolute;
  top: 0;
  right: -8px;
  height: 18px;
  min-width: 18px;
  padding: 0 4px;
  border-radius: 9999px;
  border: 1.2px solid var(--semantic-background-normal-normal);
  background-color: \${isNegative ? 'var(--semantic-status-negative)' : 'var(--semantic-primary-normal)'};
  color: var(--semantic-background-normal-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard JP', sans-serif;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.273;
  letter-spacing: 0.342px;
\`;

const cardGridStyle = css\`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  width: 100%;
\`;

const newsGridStyle = css\`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
\`;

const newsCardStyle = css\`
  position: relative;
  height: 280px;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--semantic-fill-alternative);
  border: 1px solid var(--semantic-line-normal-alternative);
\`;

const newsCardOverlayStyle = (accent) => css\`
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 40%,
    \${accent} 100%
  );
\`;

const newsCardTextStyle = css\`
  position: absolute;
  left: 26px;
  right: 26px;
  bottom: 26px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--semantic-static-white);
  text-shadow: 0 0 12px rgba(0, 0, 0, 0.22);
\`;

const newsCardPlayStyle = css\`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  color: var(--semantic-static-white);
\`;

const sectionHeaderRowStyle = css\`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin-bottom: 20px;
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

// ------- 컴포넌트 -------
const Shortcut = ({ label, Icon, badge }) => (
  <Box sx={shortcutItemStyle}>
    <Box sx={shortcutIconWrapperStyle}>
      <Icon aria-hidden />
      {badge && (
        <Box as="span" sx={shortcutBadgeStyle(badge === 'N')}>
          {badge}
        </Box>
      )}
    </Box>
    <Typography variant="label2" weight="medium" color="semantic.label.alternative" sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
      {label}
    </Typography>
  </Box>
);

const SectionHeaderRow = ({ title, action = '전체보기' }) => (
  <Box sx={sectionHeaderRowStyle}>
    <SectionHeader sx={{ flex: 1 }}>{title}</SectionHeader>
    {action && (
      <TextButton color="assistive" size="medium">
        {action}
      </TextButton>
    )}
  </Box>
);

const MatchCard = ({ overlay, title, caption, badge }) => (
  <Card>
    <CardThumbnail
      ratio="264 / 176"
      leadingContent={
        <CardThumbnailContent variant="text">{overlay}</CardThumbnailContent>
      }
      trailingContent={
        <CardThumbnailContent variant="toggle-icon">
          <IconBookmark aria-label="저장" />
        </CardThumbnailContent>
      }
    />
    <CardContent>
      <CardTitle variant="body1" weight="bold">{title}</CardTitle>
      <CardCaption variant="label2" weight="medium">{caption}</CardCaption>
      {badge && (
        <Box sx={{ marginTop: '6px' }}>
          <ContentBadge color="accent" size="xsmall" variant="solid">
            {badge}
          </ContentBadge>
        </Box>
      )}
    </CardContent>
  </Card>
);

const SimpleCard = ({ overlay, title, caption }) => (
  <Card>
    <CardThumbnail
      ratio="264 / 176"
      leadingContent={
        <CardThumbnailContent variant="text">{overlay}</CardThumbnailContent>
      }
      trailingContent={
        <CardThumbnailContent variant="toggle-icon">
          <IconBookmark aria-label="저장" />
        </CardThumbnailContent>
      }
    />
    <CardContent>
      <CardTitle variant="body1" weight="bold">{title}</CardTitle>
      <CardCaption variant="label2" weight="medium">{caption}</CardCaption>
    </CardContent>
  </Card>
);

const CtaCard = () => (
  <Card>
    <CardThumbnail ratio="264 / 176" />
    <CardContent>
      <CardTitle variant="body1" weight="bold">경력 인증하면 AI 예측 정확도 3배 UP</CardTitle>
      <Box sx={{ marginTop: '6px' }}>
        <TextButton color="primary" size="small" trailingContent={<IconArrowRight />}>
          경력 인증하기
        </TextButton>
      </Box>
    </CardContent>
  </Card>
);

const NewsCard = ({ title, subtitle, accent, play }) => (
  <Box sx={newsCardStyle}>
    <Box sx={newsCardOverlayStyle(accent)} aria-hidden />
    {play && (
      <Box sx={newsCardPlayStyle} aria-hidden>
        <IconPlay />
      </Box>
    )}
    <Box sx={newsCardTextStyle}>
      <Typography as="h3" variant="heading1" weight="bold" color="semantic.static.white">
        {title}
      </Typography>
      <Typography variant="body2-reading" weight="medium" color="semantic.static.white">
        {subtitle}
      </Typography>
    </Box>
  </Box>
);

// ------- GNB -------
const Gnb = () => (
  <Box as="header" sx={gnbWrapperStyle}>
    <FlexBox alignItems="center" justifyContent="space-between" sx={gnbContentStyle}>
      <FlexBox gap="64px" alignItems="center">
        <Box as="span" sx={logoStyle} aria-label="wanted">wanted</Box>
        <FlexBox gap="40px" alignItems="center">
          {GNB_MENU_ITEMS.map((item, idx) => (
            <FlexBox key={item} gap="4px" alignItems="center" justifyContent="center">
              {idx === 0 && <IconListCategory aria-hidden />}
              <Typography variant="body2" weight="bold" color="semantic.label.normal">
                {item}
              </Typography>
            </FlexBox>
          ))}
        </FlexBox>
      </FlexBox>
      <FlexBox gap="20px" alignItems="center">
        <FlexBox gap="16px" alignItems="center">
          <IconButton variant="normal" aria-label="search"><IconSearch /></IconButton>
          <IconButton variant="normal" aria-label="notifications"><IconBell /></IconButton>
          <AvatarButton aria-label="profile">
            <Avatar size="xsmall" variant="person" />
          </AvatarButton>
        </FlexBox>
        <Button variant="outlined" color="assistive" size="small">기업 서비스</Button>
      </FlexBox>
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
const Demo = () => (
  <Box sx={pageWrapperStyle}>
    <Gnb />

    <Box sx={shortcutContainerStyle}>
      <Box sx={shortcutListStyle}>
        {SHORTCUTS.map((s) => (
          <Shortcut key={s.label} label={s.label} Icon={s.Icon} badge={s.badge} />
        ))}
      </Box>
    </Box>

    <Box sx={bodyContainerStyle}>
      <Box as="section">
        <SectionHeaderRow title="합격 가능성 높은 포지션" />
        <Box sx={cardGridStyle}>
          {MATCH_CARDS.map((c) => (
            <MatchCard key={c.id} overlay={c.overlay} title={c.title} caption={c.caption} badge={c.badge} />
          ))}
          <CtaCard />
        </Box>
      </Box>

      <Box as="section">
        <SectionHeaderRow title="지금 주목할 소식" />
        <Box sx={newsGridStyle}>
          {NEWS_CARDS.map((c) => (
            <NewsCard key={c.id} title={c.title} subtitle={c.subtitle} accent={c.accent} play={c.play} />
          ))}
        </Box>
      </Box>

      <Box as="section">
        <SectionHeaderRow title="AI 추천 포지션" />
        <Box sx={cardGridStyle}>
          {RECOMMEND_CARDS.map((c) => (
            <SimpleCard key={c.id} overlay={c.overlay} title={c.title} caption={c.caption} />
          ))}
        </Box>
      </Box>

      <Box as="section">
        <SectionHeaderRow title="최근 본 포지션" />
        <Box sx={cardGridStyle}>
          {VIEWED_CARDS.map((c) => (
            <SimpleCard key={c.id} overlay={c.overlay} title={c.title} caption={c.caption} />
          ))}
        </Box>
      </Box>
    </Box>

    <Footer />
  </Box>
);

export default Demo;
`;
