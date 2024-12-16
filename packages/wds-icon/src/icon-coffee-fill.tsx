import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCoffeeFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M5.86748 3.09472H16.1341C16.5256 3.0947 16.8721 3.09469 17.1593 3.11815C17.4651 3.14313 17.7819 3.19914 18.0904 3.35631C18.542 3.5864 18.9091 3.95355 19.1392 4.40514C19.2562 4.63478 19.3171 4.86907 19.351 5.09999H19.7498C22.0418 5.09999 23.8998 6.958 23.8998 9.24998C23.8998 11.542 22.0418 13.4 19.7498 13.4H18.4399C17.0342 16.0727 14.2307 17.8957 11.0012 17.8957C6.3619 17.8957 2.60082 14.1338 2.60082 9.49471V6.36138C2.60081 5.96988 2.60079 5.62338 2.62425 5.33623C2.64923 5.03045 2.70524 4.7136 2.86241 4.40514C3.09251 3.95355 3.45966 3.5864 3.91125 3.35631C4.2197 3.19914 4.53655 3.14313 4.84233 3.11815C5.12947 3.09469 5.47601 3.0947 5.86748 3.09472ZM19.7498 6.89998H19.4008V9.49471C19.4008 10.2217 19.3084 10.9272 19.1348 11.6H19.7498C21.0477 11.6 22.0998 10.5478 22.0998 9.24998C22.0998 7.95211 21.0477 6.89998 19.7498 6.89998Z"
        fill="currentColor"
      />
      <path
        d="M4.75097 20.099C4.25391 20.099 3.85097 20.5019 3.85097 20.999C3.85097 21.496 4.25391 21.899 4.75097 21.899H17.7509C18.248 21.899 18.6509 21.496 18.6509 20.999C18.6509 20.5019 18.248 20.099 17.7509 20.099H4.75097Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCoffeeFill;
