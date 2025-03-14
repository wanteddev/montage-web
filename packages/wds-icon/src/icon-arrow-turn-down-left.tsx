import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconArrowTurnDownLeft = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M19.8998 3.99765C19.8998 3.50059 19.4969 3.09765 18.9998 3.09765C18.5028 3.09765 18.0998 3.50059 18.0998 3.99765V5.49764C18.0998 6.91262 18.0991 7.91973 18.0347 8.70834C17.9711 9.48644 17.85 9.97223 17.653 10.359C17.2599 11.1305 16.6327 11.7577 15.8612 12.1508C15.4744 12.3478 14.9887 12.4689 14.2105 12.5325C13.4219 12.5969 12.4148 12.5976 10.9999 12.5976H6.67412L10.1363 9.13549C10.4877 8.78402 10.4877 8.21418 10.1363 7.86271C9.78478 7.51123 9.21494 7.51123 8.86347 7.86271L3.86348 12.8627C3.51201 13.2142 3.51201 13.784 3.86348 14.1355L8.86347 19.1355C9.21494 19.4869 9.78478 19.4869 10.1363 19.1355C10.4877 18.784 10.4877 18.2142 10.1363 17.8627L6.67119 14.3976H11.0396C12.406 14.3976 13.4866 14.3976 14.3571 14.3265C15.2465 14.2538 15.9956 14.1025 16.6784 13.7546C17.7885 13.1889 18.6911 12.2863 19.2568 11.1762C19.6047 10.4934 19.7561 9.74433 19.8287 8.85491C19.8998 7.98442 19.8998 6.90384 19.8998 5.53738V3.99765Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowTurnDownLeft;
