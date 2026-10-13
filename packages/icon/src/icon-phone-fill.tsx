import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 수화기를 표현합니다.
 * 키워드: 전화기, Phone
 * 속성: Solid
 */
const IconPhoneFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.18174 15.8215C11.4907 19.1305 14.8244 20.3533 17.0083 20.7957C18.8212 21.1629 20.4911 20.3413 21.6552 19.1772L21.9272 18.9052C23.1944 17.638 23.0204 15.5363 21.5622 14.4947L19.5676 13.07C18.6129 12.3881 17.3052 12.4964 16.4756 13.326L15.6465 14.1551C15.0405 13.9032 13.8215 13.2589 12.2829 11.7203C10.7444 10.1817 10.1001 8.96278 9.84823 8.35678L10.6773 7.52768C11.5069 6.69809 11.6152 5.39033 10.9332 4.43565L9.50854 2.44106C8.46695 0.982833 6.36527 0.808892 5.09812 2.07605L4.82612 2.34805C3.66205 3.51211 2.84039 5.18206 3.20763 6.99492C3.65005 9.17891 4.87282 12.5126 8.18174 15.8215Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPhoneFill;
