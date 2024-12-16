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
        d="M13.8929 2.11228C13.9436 1.70734 13.7154 1.31902 13.337 1.16617C12.9586 1.01331 12.5247 1.13418 12.2799 1.46065L5.17552 10.9331C4.88743 11.3172 4.63489 11.6539 4.45953 11.9383C4.28644 12.219 4.0911 12.5959 4.10034 13.0401C4.11219 13.6103 4.37954 14.145 4.82857 14.4966C5.17838 14.7705 5.5971 14.8403 5.92553 14.8703C6.25826 14.9006 6.67912 14.9006 7.15924 14.9006L10.9804 14.9006L10.1069 21.8889C10.0562 22.2939 10.2844 22.6822 10.6628 22.835C11.0412 22.9879 11.475 22.867 11.7199 22.5406L18.8243 13.0681C19.1124 12.684 19.3649 12.3473 19.5403 12.0629C19.7134 11.7822 19.9087 11.4053 19.8995 10.9611C19.8876 10.3909 19.6203 9.85624 19.1712 9.50464C18.8214 9.23075 18.4027 9.16087 18.0743 9.13092C17.7415 9.10057 17.3207 9.10059 16.8405 9.10062L13.0194 9.10062L13.8929 2.11228Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconThunderFill;
