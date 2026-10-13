import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 불꽃을 표현합니다.
 * 키워드: Featured, Hot, 인기
 * 속성: Solid
 */
const IconFireFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.6089 2.41218C12.2339 1.42782 13.61 1.22151 14.4835 2.03486C18.5799 5.84912 21.1496 9.50889 21.1496 13.6009C21.1496 18.5163 17.3281 22.4009 11.9996 22.4009C9.36702 22.4009 7.07319 21.5024 5.43211 19.9247C3.78893 18.345 2.84961 16.1309 2.84961 13.6009C2.84961 10.8753 3.96102 8.26353 5.85953 6.26287C6.48774 5.60085 7.48794 5.6296 8.11081 6.19018L8.8104 6.81981L11.6089 2.41218ZM8.49959 15.6005C8.49959 17.5005 10.0496 19.0005 11.9996 19.0005C13.9496 19.0005 15.4996 17.5005 15.4996 15.6005C15.4996 13.7005 13.9496 12.2005 11.9996 10.5005C10.0496 12.2005 8.49959 13.7005 8.49959 15.6005Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFireFill;
