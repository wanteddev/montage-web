'use client';

import { Box } from '@wanteddev/wds';

import { Heading2, Heading3 } from '../../mdx/section/layout';

import { linkStyle, listStyle, textStyle } from './style';

const TermsOfUse = () => {
  return (
    <>
      <Heading2 content="1. 약관 적용" />

      <Box as="p" sx={textStyle}>
        원티드 디자인 시스템(이하 &quot;시스템&quot;)을 사용하시는 경우, 본 이용
        약관이 적용됩니다.
        {'\n'}본 시스템은 오픈소스 프로젝트로서, 커뮤니티의 기여와 협업을
        환영합니다.
      </Box>

      <Box as="ul" sx={{ '&&': { margin: '32px 0px 0px' } }}>
        <li>
          본 시스템은 피싱, 사기, 개인정보 탈취 등 불법적이거나 공익에 반하는
          목적으로 사용할 수 없습니다.
        </li>
        <li>
          원티드의 로고와 브랜드 자산은 별도 가이드라인을 따르며, 원티드를
          사칭하는 방식으로는 사용할 수 없습니다.
        </li>
        <li>
          본 시스템은 &quot;있는 그대로&quot; 제공되며 어떠한 보증도 하지
          않습니다. 저작권자와 기여자는 손해에 대해 책임지지 않습니다.
        </li>
        <li>모든 기여는 프로젝트 라이선스 조건에 따릅니다.</li>
        <li>
          본 약관은 변경될 수 있으며 중요 변경사항은 공식 채널을 통해
          공지됩니다.
        </li>
      </Box>

      <Heading2 content="2. 라이선스" sx={{ marginTop: '64px' }} />

      <Box as="p" sx={[{ margin: '0px 0px 40px' }, textStyle]}>
        본 시스템은{' '}
        <Box
          href="https://opensource.org/license/MIT"
          target="_blank"
          rel="noreferrer"
          as="a"
          sx={linkStyle}
        >
          MIT 라이선스
        </Box>
        에 따라 제공되는 오픈소스 프로젝트로서,{'\n'}
        상업적 목적을 포함한 모든 용도로 자유롭게 사용, 수정, 배포가 가능합니다.
        {'\n'}단, 저작권 표시 및 라이선스 전문을 포함해야 합니다.
      </Box>

      <Heading3 content="허용 사항" />

      <Box as="ul" sx={listStyle()}>
        <li>상업적 목적을 포함한 모든 용도로 자유롭게 사용 가능합니다.</li>
        <li>파생 저작물 생성 가능합니다.</li>
        <li>소스 코드의 수정 및 배포 가능합니다.</li>
        <li>모든 기여는 프로젝트 라이선스 조건에 따릅니다.</li>
        <li>사적 이용이 가능합니다.</li>
      </Box>

      <Heading3 content="의무 사항" />

      <Box as="ul" sx={listStyle()}>
        <li>
          저작권 표시 및 라이선스 전문을 소프트웨어의 모든 복사본 또는 상당
          부분에 포함합니다.
        </li>
        <li>원저작자 표시를 유지합니다.</li>
      </Box>

      <Heading3 content="제한 사항" />

      <Box as="ul" sx={listStyle(true)}>
        <li>
          본 소프트웨어는 &quot;있는 그대로&quot; 제공되며, 어떠한 명시적 또는
          묵시적 보증도 하지 않습니다.
        </li>
        <li>저작권자나 기여자는 어떠한 손해에 대해서도 책임지지 않습니다.</li>
        <li>
          본 시스템은 피싱, 사기, 개인정보 탈취 등 불법적이거나 공익에 반하는
          목적으로 사용할 수 없습니다.
        </li>
      </Box>

      <Heading2 content="3. 브랜드 가이드라인" sx={{ marginTop: '64px' }} />

      <Heading3
        content="1. 원티드 브랜드 자산 사용"
        sx={{ marginTop: '8px' }}
      />

      <Box as="ul" sx={listStyle()}>
        <li>
          원티드의 로고, 워드마크, 기타 브랜드 자산은 별도의 브랜드 가이드라인을
          따릅니다.
        </li>
        <li>
          디자인 시스템 컴포넌트는 자유롭게 사용 가능하나, 원티드 브랜드를
          사칭하거나 오인하게 하는 방식으로 사용이 불가합니다.
        </li>
      </Box>

      <Heading3 content="2. 기여자 표시" />

      <Box as="ul" sx={listStyle(true)}>
        <li>
          본 시스템을 사용하여 제품을 만드는 경우, 원티드 디자인 시스템을
          사용했음을 명시하는 것을 권장합니다.
        </li>
      </Box>

      <Heading2 content="4. 기여 가이드라인" sx={{ marginTop: '64px' }} />

      <Heading3 content="1. 기여 방법" sx={{ marginTop: '8px' }} />

      <Box as="ul" sx={listStyle()}>
        <li>
          Figma Community를 통해 의견 및 이슈 리포팅 및 개선을 제안할 수
          있습니다.
        </li>
      </Box>

      <Heading3 content="2. 기여자 동의" />

      <Box as="ul" sx={listStyle(true)}>
        <li>
          모든 기여는 본 프로젝트의 라이선스 조건에 따라 제공됨에 동의합니다.
        </li>
        <li>
          기여한 내용에 대한 저작권은 기여자에게 있으나, 프로젝트 라이선스에
          따라 배포됩니다.
        </li>
      </Box>

      <Heading2 content="5. 면책 조항" sx={{ marginTop: '64px' }} />

      <Box as="p" sx={textStyle}>
        본 시스템은 &quot;있는 그대로&quot; 제공되며, 특정 목적에의 적합성,
        상품성, 권리 비침해에 대한 묵시적 보증을 포함하여 어떠한 종류의 명시적
        또는 묵시적 보증도 하지 않습니다.
      </Box>

      <Heading2 content="6. 개인정보 보호" sx={{ marginTop: '64px' }} />

      <Box as="ul" sx={listStyle(true)}>
        <li>본 시스템 자체는 사용자의 개인정보를 수집하지 않습니다.</li>
        <li>
          단, GitHub 등 제3자 플랫폼을 통한 기여 시 해당 플랫폼의 개인정보
          처리방침이 적용됩니다.
        </li>
      </Box>

      <Heading2 content="7. 약관의 변경" sx={{ marginTop: '64px' }} />

      <Box as="ul" sx={listStyle(true)}>
        <li>본 약관은 필요에 따라 변경될 수 있습니다.</li>
        <li>중요한 변경 사항은 공식 채널을 통해 공지됩니다.</li>
      </Box>
    </>
  );
};

export default TermsOfUse;
