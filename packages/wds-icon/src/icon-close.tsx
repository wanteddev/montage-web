import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconClose = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.86346 4.86346C5.21493 4.51199 5.78478 4.51199 6.13625 4.86346L11.9999 10.7271L17.8635 4.86346C18.2149 4.51199 18.7848 4.51199 19.1362 4.86346C19.4877 5.21493 19.4877 5.78478 19.1362 6.13625L13.2726 11.9999L19.1362 17.8635C19.4877 18.2149 19.4877 18.7848 19.1362 19.1363C18.7848 19.4877 18.2149 19.4877 17.8635 19.1363L11.9999 13.2727L6.13625 19.1363C5.78478 19.4877 5.21493 19.4877 4.86346 19.1363C4.51199 18.7848 4.51199 18.2149 4.86346 17.8635L10.7271 11.9999L4.86346 6.13625C4.51199 5.78478 4.51199 5.21493 4.86346 4.86346Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClose;
