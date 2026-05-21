import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 유틸리티를 표현합니다.
 * 키워드: 공구, Utility
 * 속성: Solid
 */
const IconUtilityFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M16.4958 2.31238C17.1909 2.42159 17.3587 3.25875 16.8611 3.75628L14.7032 5.9142C14.2885 6.32934 14.289 7.00248 14.7039 7.41749L16.0698 8.78337C16.4848 9.19804 17.158 9.19872 17.5731 8.78406L19.7269 6.63029C20.2251 6.13225 21.0621 6.30206 21.1694 6.99834C21.4458 8.79286 20.8732 10.7166 19.4617 12.1283C17.6612 13.9288 15.0271 14.3647 12.8913 13.4148L6.41612 19.8899C5.63513 20.6709 4.36875 20.6708 3.5877 19.8899C2.80666 19.1089 2.80667 17.8425 3.5877 17.0615L10.0642 10.585C9.1155 8.44936 9.55015 5.81646 11.35 4.01661C12.7658 2.60103 14.6969 2.02978 16.4958 2.31238Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconUtilityFill;
