import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

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
        d="M8.18182 15.8215C11.4908 19.1305 14.8245 20.3533 17.0085 20.7957C18.8213 21.1629 20.4913 20.3413 21.6553 19.1772L21.9273 18.9052C23.1945 17.638 23.0205 15.5363 21.5623 14.4947L19.5677 13.07C18.613 12.3881 17.3053 12.4964 16.4757 13.326L15.6466 14.1551C15.0406 13.9032 13.8216 13.2589 12.283 11.7203C10.7444 10.1817 10.1002 8.96278 9.84831 8.35678L10.6774 7.52768C11.507 6.69809 11.6152 5.39033 10.9333 4.43565L9.50862 2.44106C8.46703 0.982833 6.36534 0.808892 5.09818 2.07605L4.82618 2.34805C3.66211 3.51211 2.84045 5.18206 3.20769 6.99492C3.65011 9.17891 4.87288 12.5126 8.18182 15.8215Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPhoneFill;
