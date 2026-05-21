import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 왼쪽 화살표를 표현합니다.
 * 키워드: 애로우, Arrow, 화살표, Left, Back, Thick
 * 속성: Outlined
 */
const IconArrowLeftThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.58089 11.0807C2.07321 11.5884 2.07321 12.4115 2.58089 12.9192L9.58086 19.9192C10.0885 20.4268 10.9117 20.4268 11.4193 19.9192C11.927 19.4115 11.927 18.5884 11.4193 18.0807L6.63859 13.2999H20.5001C21.218 13.2999 21.8001 12.7179 21.8001 11.9999C21.8001 11.282 21.218 10.6999 20.5001 10.6999L6.63859 10.6999L11.4193 5.91917C11.927 5.41148 11.927 4.58837 11.4193 4.08069C10.9117 3.57301 10.0885 3.57301 9.58086 4.08069L2.58089 11.0807Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowLeftThick;
