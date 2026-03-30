import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 포인트를 표현합니다.
 * 키워드: Wanted Point, 원티드 포인트
 **/
const IconCirclePoint = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.31942 15.3806C9.31942 15.8607 9.70856 16.2498 10.1886 16.2498C10.6686 16.2498 11.0578 15.8607 11.0578 15.3806V13.3721H12.2323C14.1703 13.3721 15.4976 12.2269 15.4976 10.5532C15.4976 8.89119 14.1703 7.746 12.2323 7.746H10.9194C10.3594 7.746 10.0793 7.746 9.86543 7.85499C9.67726 7.95086 9.52428 8.10384 9.42841 8.29201C9.31942 8.50592 9.31942 8.78594 9.31942 9.346V15.3806ZM12.2558 11.7865H11.0578V9.33165H12.2558C13.1896 9.33165 13.7475 9.78973 13.7475 10.5532C13.7475 11.3225 13.1896 11.7865 12.2558 11.7865Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.1001C6.53231 2.1001 2.09995 6.53248 2.09995 12.0001C2.09995 17.4677 6.53231 21.9001 11.9999 21.9001C17.4675 21.9001 21.8999 17.4677 21.8999 12.0001C21.8999 6.53248 17.4675 2.1001 11.9999 2.1001ZM3.89994 12.0001C3.89994 7.52659 7.52642 3.9001 11.9999 3.9001C16.4734 3.9001 20.0999 7.52659 20.0999 12.0001C20.0999 16.4736 16.4734 20.1001 11.9999 20.1001C7.52642 20.1001 3.89994 16.4736 3.89994 12.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCirclePoint;
