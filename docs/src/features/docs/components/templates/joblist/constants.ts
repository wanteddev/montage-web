export const DESIGN_INTENT = [
  '"검색 결과/필터링" 화면 패턴입니다. 사용자가 카테고리·경력·정렬·필터 조건으로 다수의 포지션을 좁혀가며 비교·탐색할 수 있도록 카드 그리드를 풀폭으로 노출합니다.',
  '상단에는 두 개의 SectionHeader(Title/Subtitle 변형 — 직군 카테고리와 경력 조건)를 좌우로 배치해 현재 검색 컨텍스트를 명확히 보여줍니다. 우측에는 정렬 토글(최신순/추천순/인기순)을 두어 정렬 변경 비용을 낮춥니다.',
  '필터 칩 행은 자주 쓰는 조건(글로벌 TOP, 대규모 채용, 적극 채용 등)을 한 줄에 노출해 한 클릭으로 결과를 좁힐 수 있게 합니다. ContentChip으로 통일된 시각 위계를 갖고, 좌측의 토글 칩(서울 전체 등)은 multi-select 가능한 드롭다운입니다.',
  '결과는 5컬럼 카드 그리드로 표시하고, cardGap(20px)으로 정렬됩니다. 각 카드는 합격보상금 overlay + 북마크 토글이 일관되게 배치되어 동일한 패턴으로 인지됩니다.',
  '본문 마지막 행과 Footer 사이는 screenMarginBottom(160px)으로 끝맺음을 명확히 하고, Footer는 home 화면과 동일한 구성으로 일관성을 유지합니다.',
];

export const TOKEN_USAGE = [
  {
    token: 'layout.spacingX.globalGutter',
    value: '20px',
    usage: 'GNB·본문·Footer의 좌우 거터',
  },
  {
    token: 'layout.spacingY.marginTop.contentMarginTop',
    value: '40px',
    usage: 'GNB 아래, Section 시작 위 마진',
  },
  {
    token: 'layout.spacingY.marginTop.sectionHeaderMarginBottom',
    value: '20px',
    usage: '섹션 제목/필터와 카드 그리드 사이 간격',
  },
  {
    token: 'layout.spacingY.gap.contentGap',
    value: '60px',
    usage: 'Section 간 세로 간격',
  },
  {
    token: 'layout.spacingX.gap.cardGap',
    value: '20px',
    usage: '카드 그리드 컬럼·로우 간 간격',
  },
  {
    token: 'layout.spacingY.gap.textGap',
    value: '6px',
    usage: '카드 내 제목·캡션 사이 간격',
  },
  {
    token: 'layout.spacingY.marginBottom.screenMarginBottom',
    value: '160px',
    usage: '본문 마지막 행과 Footer 사이 간격',
  },
  {
    token: 'radius/30',
    value: '12px',
    usage: '카드 썸네일 모서리',
  },
  {
    token: 'semantic.label.normal',
    value: '#171719',
    usage: '카드 제목 / GNB 메뉴 라벨',
  },
  {
    token: 'semantic.label.alternative',
    value: 'rgba(55, 56, 60, 0.61)',
    usage: '카드 캡션 / 정렬 비활성 상태 / Footer 회사정보 텍스트',
  },
  {
    token: 'semantic.label.strong',
    value: '#000000',
    usage: '상단 카테고리·경력 SectionHeader 제목',
  },
  {
    token: 'semantic.line.normal.neutral',
    value: 'rgba(112, 115, 124, 0.16)',
    usage: 'GNB 하단 / Footer 상단 디바이더',
  },
  {
    token: 'semantic.static.white',
    value: '#FFFFFF',
    usage: '카드 overlay 캡션 컬러',
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
      '상단에 두 개의 SectionHeader를 좌우로 배치해 카테고리(직군)와 경력 조건을 표시. headingContent slot에 Button(드롭다운 화살표)을 넣습니다.',
  },
  {
    name: 'TextButton (@wanteddev/wds)',
    usage:
      '우측 정렬 토글(최신순/추천순/인기순). 활성 상태는 color="primary", 비활성은 color="assistive"로 시각 위계를 줍니다.',
  },
  {
    name: 'ContentChip (@wanteddev/wds)',
    usage:
      '필터 칩 행. 토글 칩(서울 전체/채용조건/기술스택)은 trailing icon으로 chevron-down, 텍스트 칩은 일반 ContentChip으로 사용해 시각 차이를 줍니다.',
  },
  {
    name: 'Card · CardThumbnail · CardThumbnailContent · CardContent · CardTitle · CardCaption (@wanteddev/wds)',
    usage:
      '5컬럼 채용 카드. CardThumbnail의 leadingContent에 합격보상금 overlay, trailingContent에 IconBookmark 토글. CardContent에 직무명·회사·지역·경력 정보를 표시.',
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
    name: 'IconBookmark · IconChevronDown (@wanteddev/wds-icon)',
    usage: '카드 북마크 토글 / 토글 칩 trailing 화살표.',
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

export const JOBLIST_SOURCE_CODE = `import { Avatar, AvatarButton, Box, Button, Card, CardCaption, CardContent, CardThumbnail, CardThumbnailContent, CardTitle, ContentChip, Divider, FlexBox, IconButton, SectionHeader, TextButton, Typography, css } from '@wanteddev/wds';
import { IconBell, IconBookmark, IconChevronDown, IconListCategory, IconLogoApple, IconLogoFacebook, IconLogoGooglePlay, IconLogoInstagram, IconLogoNaverBlog, IconLogoYoutube, IconSearch } from '@wanteddev/wds-icon';
import { Fragment } from 'react';

// ------- 데이터 -------
const GNB_MENU_ITEMS = ['채용', '이력서', '교육•이벤트', '콘텐츠', '소셜', '프리랜서', '더보기'];

const SORT_TABS = ['최신순', '추천순', '인기순'];
const ACTIVE_SORT = '최신순';

const TOGGLE_CHIPS = ['서울 전체', '채용조건', '기술스택'];
const FILTER_CHIPS = [
  '글로벌 TOP 기업', '대규모 채용 중', '적극 채용 중', '누적투자 100억 이상',
  '예비 유니콘', '뷰티산업', '1,001~10,000명', '인원 급성장', '회사 별 5%이하', '보너스',
];

const JOB_CARDS = [
  { id: 'j-0', title: 'Backend Engineer, Flight', company: '카카오페이', location: '서울 강남구', career: '경력 1-3년' },
  { id: 'j-1', title: '건강식품 CM(Category Manager)', company: '이베이재팬(eBay)', location: '경기 성남시', career: '3년-7년' },
  { id: 'j-2', title: 'Backend Engineer, Flight', company: '마이리얼트립', location: '서울 강남구', career: '신입-3년' },
  { id: 'j-3', title: '[쿠팡] 데이터 분석가 (CX Product)', company: '이베이재팬(eBay)', location: '서울 강남구', career: '신입-3년' },
  { id: 'j-4', title: 'Backend Engineer, Flight', company: '카카오페이', location: '서울 강남구', career: '신입-3년' },
  { id: 'j-5', title: 'Back-end Engineer (Fulfillment Technologies)', company: '쿠팡', location: '서울 강남구 · 광야 5분-13분', career: '경력 2-3년' },
  { id: 'j-6', title: '데이터 엔지니어 [AI부문]', company: '쿠팡', location: '서울 강남구', career: '신입-3년' },
  { id: 'j-7', title: 'PM - 보험 서비스 기획 및 운영', company: '카카오페이', location: '경기 성남시', career: '3년-7년' },
  { id: 'j-8', title: 'Backend Engineer, Flight', company: '마이리얼트립', location: '서울 마포구', career: '신입-3년' },
  { id: 'j-9', title: 'DevOps Engineer', company: '카카오페이', location: '경기 성남시', career: '신입-3년' },
  { id: 'j-10', title: 'Search Engineer', company: '이베이재팬(eBay)', location: '경기 성남시', career: '신입-3년' },
  { id: 'j-11', title: 'DevOps Engineer', company: '토스증권', location: '경기 성남시', career: '신입-3년' },
  { id: 'j-12', title: 'QA 담당자 [QA팀]', company: '이베이재팬(eBay)', location: '경기 성남시', career: '신입-3년' },
  { id: 'j-13', title: 'DevOps Engineer', company: '마이리얼트립', location: '서울 마포구', career: '신입-3년' },
  { id: 'j-14', title: 'QA 담당자 [QA팀]', company: '컬리', location: '서울 강남구', career: '신입-3년' },
  { id: 'j-15', title: 'Back-end Engineer (Fulfillment Technologies)', company: '강남언니', location: '서울 강남구', career: '신입-3년' },
  { id: 'j-16', title: 'QA 담당자 [QA팀]', company: '쿠팡', location: '서울 송파구', career: '신입-3년' },
  { id: 'j-17', title: '[쿠팡] 백엔드 개발자', company: '이베이재팬(eBay)', location: '경기 성남시', career: '신입-3년' },
  { id: 'j-18', title: '데이터 엔지니어 [AI부문]', company: '리디', location: '서울 강남구', career: '신입-3년' },
  { id: 'j-19', title: 'UX 리서처', company: '북북이올리브영(CJ올리브영)', location: '서울 송파구', career: '경력 3-9년' },
  { id: 'j-20', title: 'VX 디자이너', company: '이프랜드', location: '경기 성남시', career: '신입-3년' },
  { id: 'j-21', title: 'Product Designer', company: '컬리', location: '서울 강남구', career: '경력 3-9년' },
  { id: 'j-22', title: '시니어 프로덕트 디자이너', company: '해드세스', location: '경기 성남시', career: '3년-7년' },
  { id: 'j-23', title: '물류 AI 디자이너', company: '뉴비탑', location: '서울 마포구', career: '신입-3년' },
  { id: 'j-24', title: '마케팅 디자이너', company: '워크이미디어', location: '경기 성남시', career: '경력 3-9년' },
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
  padding: 40px 20px 160px;
  display: flex;
  flex-direction: column;
  gap: 20px;
\`;

const topRowStyle = css\`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
\`;

const filterRowStyle = css\`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
\`;

const cardGridStyle = css\`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  width: 100%;
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

// ------- 카드 -------
const JobCard = ({ title, company, location, career }) => (
  <Card>
    <CardThumbnail
      ratio="264 / 176"
      leadingContent={
        <CardThumbnailContent variant="text">합격보상금 100만원</CardThumbnailContent>
      }
      trailingContent={
        <CardThumbnailContent variant="toggle-icon">
          <IconBookmark aria-label="저장" />
        </CardThumbnailContent>
      }
    />
    <CardContent>
      <CardTitle variant="body1" weight="bold">{title}</CardTitle>
      <CardCaption variant="label2" weight="medium">{company}</CardCaption>
      <CardCaption variant="label2" weight="medium">
        {location} · {career}
      </CardCaption>
    </CardContent>
  </Card>
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

    <Box sx={bodyContainerStyle}>
      {/* 상단 컨텍스트 + 정렬 */}
      <Box sx={topRowStyle}>
        <FlexBox gap="16px" alignItems="center">
          <SectionHeader headingContent={<IconChevronDown aria-hidden />}>
            디자인·UI,GUI 디자이너 외 1
          </SectionHeader>
          <SectionHeader headingContent={<IconChevronDown aria-hidden />}>
            경력 전체
          </SectionHeader>
        </FlexBox>
        <FlexBox gap="16px" alignItems="center">
          {SORT_TABS.map((tab) => (
            <TextButton
              key={tab}
              size="medium"
              color={tab === ACTIVE_SORT ? 'primary' : 'assistive'}
            >
              {tab}
            </TextButton>
          ))}
        </FlexBox>
      </Box>

      {/* 필터 칩 행 */}
      <Box sx={filterRowStyle}>
        {TOGGLE_CHIPS.map((label) => (
          <ContentChip
            key={label}
            size="medium"
            trailingContent={<IconChevronDown />}
          >
            {label}
          </ContentChip>
        ))}
        {FILTER_CHIPS.map((label) => (
          <ContentChip key={label} size="medium">
            {label}
          </ContentChip>
        ))}
      </Box>

      {/* 5x5 카드 그리드 */}
      <Box as="section">
        <Box sx={cardGridStyle}>
          {JOB_CARDS.map((card) => (
            <JobCard
              key={card.id}
              title={card.title}
              company={card.company}
              location={card.location}
              career={card.career}
            />
          ))}
        </Box>
      </Box>
    </Box>

    <Footer />
  </Box>
);

export default Demo;
`;
