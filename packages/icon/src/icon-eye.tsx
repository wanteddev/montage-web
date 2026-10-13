import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M11.9999 8.09946C9.84602 8.09946 8.09993 9.84555 8.09993 11.9995C8.09993 14.1534 9.84602 15.8995 11.9999 15.8995C14.1538 15.8995 15.8999 14.1534 15.8999 11.9995C15.8999 9.84555 14.1538 8.09946 11.9999 8.09946ZM9.89993 11.9995C9.89993 10.8397 10.8401 9.89946 11.9999 9.89946C13.1597 9.89946 14.0999 10.8397 14.0999 11.9995C14.0999 13.1593 13.1597 14.0995 11.9999 14.0995C10.8401 14.0995 9.89993 13.1593 9.89993 11.9995Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 19.399C16.5562 19.399 20.4595 16.6035 22.0883 12.6342C22.2551 12.2275 22.2551 11.7711 22.0883 11.3644C20.4595 7.39508 16.5562 4.59961 12 4.59961C7.44382 4.59961 3.54053 7.39508 1.91177 11.3644C1.74491 11.7711 1.74491 12.2275 1.91177 12.6342C3.54053 16.6035 7.44382 19.399 12 19.399ZM3.59758 11.9993C4.96904 8.71093 8.21462 6.39961 12 6.39961C15.7854 6.39961 19.031 8.71093 20.4025 11.9993C19.031 15.2877 15.7854 17.599 12 17.599C8.21462 17.599 4.96904 15.2877 3.59758 11.9993Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconEye;
