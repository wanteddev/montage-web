import {
  Box,
  Divider,
  FlexBox,
  IconButton,
  Typography,
  containerStyle,
} from '@wanteddev/wds';
import { forwardRef, useState } from 'react';
import { LogoWanted } from '@wanteddev/wds-brand';
import {
  IconLogoApple,
  IconLogoFacebook,
  IconLogoGooglePlay,
  IconLogoInstagram,
  IconLogoNaverBlog,
  IconLogoYoutube,
} from '@wanteddev/wds-icon';

import {
  askLinkWrapperStyle,
  footerStyle,
  lintWrapperStyle,
  logoWantedStyle,
  socialWrapperStyle,
  summaryStyle,
  summaryWrapperStyle,
} from './style';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';

/**
 * @description A presentational footer component that renders UI only and provides no interactive behavior
 */
const Footer = forwardRef<HTMLDivElement, DefaultComponentProps<{}, 'div'>>(
  (props, ref) => {
    const [currentYear] = useState(new Date().getFullYear());

    return (
      <Box as="footer" ref={ref} {...props} sx={[footerStyle, props.sx]}>
        <FlexBox flexDirection="column" sx={containerStyle(true)}>
          <FlexBox
            flexDirection="column"
            justifyContent="space-between"
            alignItems="flex-start"
            sm={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <LogoWanted aria-label="Wanted Logo" sx={logoWantedStyle} />

            <FlexBox
              gap="8px 24px"
              flexWrap="wrap"
              justifyContent="flex-start"
              sm={{
                gap: '32px',
                flexWrap: 'initial',
                justifyContent: 'initial',
              }}
              sx={lintWrapperStyle}
            >
              <Typography
                variant="body2"
                sm={{ variant: 'body1-reading' }}
                weight="medium"
                color="semantic.label.normal"
              >
                기업소개
              </Typography>

              <Typography
                variant="body2"
                sm={{ variant: 'body1-reading' }}
                weight="medium"
                color="semantic.label.normal"
              >
                광고문의
              </Typography>

              <Typography
                variant="body2"
                sm={{ variant: 'body1-reading' }}
                weight="medium"
                color="semantic.label.normal"
              >
                고객센터
              </Typography>

              <Typography
                variant="body2"
                sm={{ variant: 'body1-reading' }}
                weight="medium"
                color="semantic.label.normal"
              >
                이용약관
              </Typography>

              <Typography
                variant="body2"
                sm={{ variant: 'body1-reading' }}
                weight="medium"
                color="semantic.label.normal"
              >
                블로그
              </Typography>

              <Typography
                variant="body2"
                sm={{ variant: 'body1-reading' }}
                weight="bold"
                color="semantic.label.normal"
                data-role="privacy-policy"
              >
                개인정보 처리방침
              </Typography>
            </FlexBox>
          </FlexBox>

          <FlexBox flexDirection="column" gap="8px" sx={summaryWrapperStyle}>
            <Typography
              variant="caption1"
              weight="medium"
              color="semantic.label.alternative"
              sm={{ variant: 'label2' }}
              sx={summaryStyle}
              as="p"
            >
              <span>(주)원티드랩</span>
              <span>대표이사 이복기</span>
            </Typography>
            <Typography
              variant="caption1"
              weight="medium"
              color="semantic.label.alternative"
              sm={{ variant: 'label2' }}
              sx={summaryStyle}
              as="p"
            >
              <span>서울특별시 송파구 올림픽로 300, 롯데월드타워 35층</span>
              <span>전화번호: 02-539-7118</span>
            </Typography>
            <Typography
              variant="caption1"
              weight="medium"
              color="semantic.label.alternative"
              sm={{ variant: 'label2' }}
              sx={summaryStyle}
              as="p"
            >
              <span>사업자등록번호: 299-86-00021</span>
              <span>통신판매번호: 2020-서울송파-3147</span>
              <span>
                유료직업소개사업등록번호: (국내) 제2020-3230259-14-5-00018호
              </span>
            </Typography>
          </FlexBox>

          <FlexBox
            gap="8px 20px"
            flexWrap="wrap"
            sm={{ gap: '8px 24px' }}
            sx={askLinkWrapperStyle}
          >
            <Typography
              display="inline-flex"
              variant="caption1"
              sm={{ variant: 'label2' }}
              weight="bold"
              color="semantic.label.alternative"
            >
              채용서비스 문의
            </Typography>

            <Typography
              display="inline-flex"
              variant="caption1"
              sm={{ variant: 'label2' }}
              weight="bold"
              color="semantic.label.alternative"
            >
              원티드스페이스 문의
            </Typography>

            <Typography
              display="inline-flex"
              variant="caption1"
              sm={{ variant: 'label2' }}
              weight="bold"
              color="semantic.label.alternative"
            >
              원티드긱스 문의
            </Typography>

            <Typography
              display="inline-flex"
              variant="caption1"
              sm={{ variant: 'label2' }}
              weight="bold"
              color="semantic.label.alternative"
            >
              프리온보딩 문의
            </Typography>

            <Typography
              display="inline-flex"
              variant="caption1"
              sm={{ variant: 'label2' }}
              weight="bold"
              color="semantic.label.alternative"
            >
              취업지원시스템 문의
            </Typography>

            <Typography
              display="inline-flex"
              variant="caption1"
              sm={{ variant: 'label2' }}
              weight="bold"
              color="semantic.label.alternative"
            >
              IR 문의
            </Typography>
          </FlexBox>

          <Divider color="semantic.line.normal.alternative" size="100%" />

          <FlexBox
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="initial"
            gap="8px"
            sm={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 'initial',
            }}
            sx={socialWrapperStyle}
          >
            <Typography
              variant="label2"
              weight="medium"
              color="semantic.label.alternative"
            >
              {`© ${currentYear} Wanted Lab, Inc.`}
            </Typography>

            <FlexBox
              flexWrap="wrap"
              gap="10px"
              sx={{
                margin: '8px 0px',
              }}
            >
              <IconButton
                size={20}
                color="semantic.label.alternative"
                aria-label="인스타그램"
              >
                <IconLogoInstagram />
              </IconButton>
              <IconButton
                size={20}
                color="semantic.label.alternative"
                aria-label="페이스북"
              >
                <IconLogoFacebook />
              </IconButton>
              <IconButton
                size={20}
                color="semantic.label.alternative"
                aria-label="유튜브"
              >
                <IconLogoYoutube />
              </IconButton>
              <IconButton
                size={20}
                color="semantic.label.alternative"
                aria-label="네이버 블로그"
              >
                <IconLogoNaverBlog />
              </IconButton>
              <IconButton
                size={20}
                color="semantic.label.alternative"
                aria-label="App Store"
              >
                <IconLogoApple />
              </IconButton>
              <IconButton
                size={20}
                color="semantic.label.alternative"
                aria-label="Google Play"
              >
                <IconLogoGooglePlay />
              </IconButton>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </Box>
    );
  },
);

Footer.displayName = 'Footer';

export { Footer };
