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
 * 속성: Solid
 */
const IconEyeFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.89964 12.0002C9.89964 10.8404 10.8398 9.9002 11.9996 9.9002C13.1594 9.9002 14.0996 10.8404 14.0996 12.0002C14.0996 13.16 13.1594 14.1002 11.9996 14.1002C10.8398 14.1002 9.89964 13.16 9.89964 12.0002Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.0936 12.6342C22.2605 12.2275 22.2605 11.7711 22.0936 11.3644C20.4649 7.39508 16.5616 4.59961 12.0054 4.59961C7.44919 4.59961 3.5459 7.39508 1.91714 11.3644C1.75028 11.7711 1.75028 12.2275 1.91714 12.6342C3.5459 16.6035 7.44919 19.399 12.0054 19.399C16.5616 19.399 20.4649 16.6035 22.0936 12.6342ZM11.9996 8.10019C9.84573 8.10019 8.09964 9.84628 8.09964 12.0002C8.09964 14.1541 9.84573 15.9002 11.9996 15.9002C14.1535 15.9002 15.8996 14.1541 15.8996 12.0002C15.8996 9.84628 14.1535 8.10019 11.9996 8.10019Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconEyeFill;
