import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconThunderFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M13.893 2.11228C13.9436 1.70735 13.7154 1.31903 13.3371 1.16617C12.9587 1.01332 12.5248 1.13418 12.2799 1.46065L5.17554 10.9332C4.88745 11.3173 4.63491 11.654 4.45955 11.9383C4.28646 12.2191 4.09112 12.596 4.10035 13.0401C4.11221 13.6103 4.37956 14.145 4.82859 14.4966C5.17839 14.7705 5.59713 14.8404 5.92556 14.8704C6.25828 14.9007 6.67915 14.9007 7.15926 14.9007L10.9804 14.9007L10.1069 21.889C10.0563 22.294 10.2845 22.6823 10.6628 22.8351C11.0412 22.988 11.4751 22.8671 11.7199 22.5407L18.8243 13.0681C19.1124 12.6841 19.365 12.3474 19.5403 12.063C19.7134 11.7822 19.9088 11.4053 19.8995 10.9612C19.8877 10.391 19.6203 9.85627 19.1713 9.50468C18.8215 9.23078 18.4028 9.16091 18.0743 9.13095C17.7416 9.10061 17.3207 9.10063 16.8406 9.10065L13.0194 9.10065L13.893 2.11228Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconThunderFill;
