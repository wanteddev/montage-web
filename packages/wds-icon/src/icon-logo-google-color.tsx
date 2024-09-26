import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconLogoGoogleColor = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M21.5039 12.2255C21.5039 11.5237 21.4412 10.8483 21.3235 10.2004H11.9999V14.0295H17.3283C17.0984 15.267 16.401 16.3164 15.3527 17.0182V19.5019H18.5515C20.4237 17.7783 21.5039 15.2406 21.5039 12.2255Z"
        fill="#3D82F0"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0002 21.9005C14.6732 21.9005 16.9139 21.0139 18.5518 19.5025L15.353 17.0176C14.4664 17.6116 13.3323 17.9625 12.0002 17.9625C9.42181 17.9625 7.23942 16.2212 6.46062 13.8815H3.15294V16.4467C4.78203 19.6818 8.13041 21.9005 12.0002 21.9005Z"
        fill="#31A752"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.46034 13.8813C6.26234 13.2873 6.15014 12.6526 6.15014 12.0003C6.15014 11.348 6.26234 10.7133 6.46034 10.1193V7.55416H3.15266C2.48276 8.89065 2.09996 10.4031 2.09996 12.0003C2.09996 13.5975 2.48276 15.11 3.15266 16.4465L6.46034 13.8813Z"
        fill="#F9BA00"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0002 6.03807C13.4533 6.03807 14.759 6.53747 15.7842 7.51866L18.6244 4.67957C16.9095 3.08128 14.6688 2.10009 12.0002 2.10009C8.13041 2.10009 4.78203 4.31878 3.15294 7.55496L6.46062 10.119C7.23942 7.77936 9.42181 6.03807 12.0002 6.03807Z"
        fill="#E64234"
      />
    </Box>
  );
});

export default IconLogoGoogleColor;
