import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconNavigationRecruit = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M10.855 2.54997C8.92206 2.54997 7.35506 4.11697 7.35506 6.04995V6.15467H6.14984C4.41016 6.15467 2.99986 7.56455 2.99986 9.30374V18.3011C2.99986 20.0403 4.41016 21.4501 6.14984 21.4501H17.8498C19.5895 21.4501 20.9998 20.0403 20.9998 18.3011V9.30374C20.9998 7.56455 19.5895 6.15467 17.8498 6.15467H16.555V6.04996C16.555 4.11697 14.988 2.54997 13.055 2.54997H10.855ZM14.555 6.15467V6.04996C14.555 5.22153 13.8834 4.54996 13.055 4.54996H10.855C10.0266 4.54996 9.35505 5.22153 9.35505 6.04995V6.15467H14.555Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconNavigationRecruit;
