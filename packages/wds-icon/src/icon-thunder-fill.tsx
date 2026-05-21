import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 번개처럼 빠른 상태 및 연상되는 기능을 표현합니다.
 * 키워드: Lightning, Zap, Thunder, 번개, 빠름, 우사인볼트, Volt, Fast
 * 속성: Solid
 */
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
        d="M13.8929 2.11228C13.9435 1.70735 13.7154 1.31903 13.337 1.16617C12.9586 1.01332 12.5247 1.13418 12.2799 1.46065L5.17551 10.9332C4.88742 11.3173 4.63488 11.654 4.45952 11.9383C4.28643 12.2191 4.09109 12.596 4.10032 13.0401C4.11218 13.6103 4.37953 14.145 4.82856 14.4966C5.17836 14.7705 5.59709 14.8404 5.92552 14.8704C6.25824 14.9007 6.67911 14.9007 7.15922 14.9007L10.9804 14.9007L10.1068 21.889C10.0562 22.294 10.2844 22.6823 10.6628 22.8351C11.0412 22.988 11.475 22.8671 11.7199 22.5407L18.8242 13.0681C19.1123 12.6841 19.3649 12.3474 19.5402 12.063C19.7133 11.7822 19.9087 11.4053 19.8994 10.9612C19.8876 10.391 19.6202 9.85627 19.1712 9.50468C18.8214 9.23078 18.4027 9.16091 18.0742 9.13095C17.7415 9.10061 17.3206 9.10063 16.8405 9.10065L13.0194 9.10065L13.8929 2.11228Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconThunderFill;
