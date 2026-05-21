import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M8.18177 15.8215C11.4907 19.1305 14.8244 20.3533 17.0084 20.7957C18.8212 21.1629 20.4912 20.3413 21.6552 19.1772L21.9272 18.9052C23.1944 17.638 23.0204 15.5363 21.5622 14.4947L19.5676 13.07C18.613 12.3881 17.3052 12.4964 16.4756 13.326L15.6465 14.1551C15.0405 13.9032 13.8216 13.2589 12.283 11.7203C10.7444 10.1817 10.1001 8.96278 9.84826 8.35678L10.6774 7.52768C11.5069 6.69809 11.6152 5.39033 10.9333 4.43565L9.50857 2.44106C8.46698 0.982833 6.3653 0.808892 5.09815 2.07605L4.82615 2.34805C3.66208 3.51211 2.84042 5.18206 3.20766 6.99492C3.65008 9.17891 4.87285 12.5126 8.18177 15.8215Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPhoneFill;
