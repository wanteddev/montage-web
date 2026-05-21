import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 속도를 표현합니다.
 * 키워드: Thunder, 번개, 속도, Fast
 * 속성: Solid
 */
const IconZepFastFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M16.3504 1.20368C16.8563 1.16575 17.3079 1.5737 17.3182 2.08357C17.3201 2.18078 17.3062 2.28001 17.2752 2.37653L15.158 8.95075L20.4451 8.95661C22.0786 9.08408 22.8103 11.1422 21.5496 12.2681L9.78107 22.773C9.59154 22.9418 9.34583 23.0184 9.10529 22.9976C8.76922 22.9687 8.44671 22.7188 8.3338 22.4019C8.26931 22.2205 8.263 22.0179 8.32501 21.8248L10.4432 15.2515H5.31622C3.57261 15.251 2.75068 13.0959 4.0506 11.9342L15.8192 1.42927C15.9707 1.29413 16.1583 1.21806 16.3504 1.20368Z"
        fill="currentColor"
      />
      <path
        d="M5.6004 6.20075C6.0974 6.20082 6.50079 6.60413 6.50079 7.10114C6.50058 7.59798 6.09727 8.00147 5.6004 8.00153H3.1004C2.60348 8.00153 2.20023 7.59802 2.20001 7.10114C2.20001 6.60409 2.60335 6.20075 3.1004 6.20075H5.6004Z"
        fill="currentColor"
      />
      <path
        d="M7.6004 2.94978C8.09729 2.94984 8.50061 3.35331 8.50079 3.85017C8.50079 4.34718 8.0974 4.75049 7.6004 4.75056H3.1004C2.60335 4.75056 2.20001 4.34722 2.20001 3.85017C2.20019 3.35327 2.60346 2.94978 3.1004 2.94978H7.6004Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconZepFastFill;
