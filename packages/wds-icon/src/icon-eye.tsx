import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 정보 표시 여부를 구분할 때 사용합니다.
 * 키워드: 뷰, 눈, 눈알, 조회, 비밀번호 조회, 문자표시, 문자 표시 안함. View, Eye, Browse, Password Reveal
 * 속성: Outlined
 */
const IconEye = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      as="svg"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      ref={ref}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9998 8.09946C9.84593 8.09946 8.09984 9.84555 8.09984 11.9995C8.09984 14.1534 9.84593 15.8995 11.9998 15.8995C14.1538 15.8995 15.8998 14.1534 15.8998 11.9995C15.8998 9.84555 14.1538 8.09946 11.9998 8.09946ZM9.89984 11.9995C9.89984 10.8397 10.84 9.89946 11.9998 9.89946C13.1596 9.89946 14.0998 10.8397 14.0998 11.9995C14.0998 13.1593 13.1596 14.0995 11.9998 14.0995C10.84 14.0995 9.89984 13.1593 9.89984 11.9995Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 19.399C16.5561 19.399 20.4594 16.6035 22.0882 12.6342C22.2551 12.2275 22.2551 11.7711 22.0882 11.3644C20.4594 7.39508 16.5561 4.59961 11.9999 4.59961C7.44373 4.59961 3.54044 7.39508 1.91168 11.3644C1.74481 11.7711 1.74481 12.2275 1.91168 12.6342C3.54044 16.6035 7.44373 19.399 11.9999 19.399ZM3.59749 11.9993C4.96895 8.71093 8.21452 6.39961 11.9999 6.39961C15.7853 6.39961 19.0309 8.71093 20.4024 11.9993C19.0309 15.2877 15.7853 17.599 11.9999 17.599C8.21452 17.599 4.96895 15.2877 3.59749 11.9993Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconEye;
