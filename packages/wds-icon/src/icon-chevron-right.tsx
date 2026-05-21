import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽 꺾쇠를 표현합니다. 여백, 두께, 사이즈를 조정할 수 있습니다.
 * 키워드: 꺾쇠, 앞으로 가기, Chevron, Forward, Right
 * 속성: Outlined
 */
const IconChevronRight = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M7.86337 3.36272C7.51189 3.7142 7.51189 4.28405 7.86337 4.63552L15.227 11.9991L7.86337 19.3627C7.51189 19.7142 7.51189 20.284 7.86337 20.6355C8.21484 20.987 8.78469 20.987 9.13616 20.6355L17.1362 12.6355C17.4876 12.284 17.4876 11.7142 17.1362 11.3627L9.13616 3.36272C8.78469 3.01125 8.21484 3.01125 7.86337 3.36272Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronRight;
