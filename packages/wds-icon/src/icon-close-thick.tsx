import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCloseThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.58079 4.58094C5.08847 4.07326 5.91159 4.07326 6.41927 4.58095L12 10.1617L17.5808 4.58095C18.0884 4.07326 18.9116 4.07326 19.4192 4.58094C19.9269 5.08862 19.9269 5.91174 19.4192 6.41942L13.8385 12.0002L19.4192 17.5809C19.9269 18.0886 19.9269 18.9117 19.4192 19.4194C18.9116 19.9271 18.0884 19.9271 17.5808 19.4194L12 13.8386L6.41927 19.4194C5.91159 19.9271 5.08847 19.9271 4.58079 19.4194C4.07311 18.9117 4.07311 18.0886 4.58079 17.5809L10.1615 12.0002L4.58079 6.41942C4.07311 5.91174 4.07311 5.08862 4.58079 4.58094Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCloseThick;
