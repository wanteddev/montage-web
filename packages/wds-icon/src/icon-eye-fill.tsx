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
        d="M9.89973 12.0002C9.89973 10.8404 10.8399 9.9002 11.9997 9.9002C13.1595 9.9002 14.0997 10.8404 14.0997 12.0002C14.0997 13.16 13.1595 14.1002 11.9997 14.1002C10.8399 14.1002 9.89973 13.16 9.89973 12.0002Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.0937 12.6342C22.2606 12.2275 22.2606 11.7711 22.0937 11.3644C20.465 7.39508 16.5617 4.59961 12.0055 4.59961C7.44928 4.59961 3.54599 7.39508 1.91723 11.3644C1.75037 11.7711 1.75037 12.2275 1.91723 12.6342C3.54599 16.6035 7.44928 19.399 12.0055 19.399C16.5617 19.399 20.465 16.6035 22.0937 12.6342ZM11.9997 8.10019C9.84582 8.10019 8.09973 9.84628 8.09973 12.0002C8.09973 14.1541 9.84582 15.9002 11.9997 15.9002C14.1536 15.9002 15.8997 14.1541 15.8997 12.0002C15.8997 9.84628 14.1536 8.10019 11.9997 8.10019Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconEyeFill;
