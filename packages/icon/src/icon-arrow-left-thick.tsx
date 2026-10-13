import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M2.58095 11.0807C2.07328 11.5884 2.07328 12.4115 2.58095 12.9192L9.58092 19.9192C10.0886 20.4268 10.9117 20.4268 11.4194 19.9192C11.9271 19.4115 11.9271 18.5884 11.4194 18.0807L6.63865 13.2999H20.5001C21.2181 13.2999 21.8001 12.7179 21.8001 11.9999C21.8001 11.282 21.2181 10.6999 20.5001 10.6999L6.63865 10.6999L11.4194 5.91917C11.9271 5.41148 11.9271 4.58837 11.4194 4.08069C10.9117 3.57301 10.0886 3.57301 9.58092 4.08069L2.58095 11.0807Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowLeftThick;
