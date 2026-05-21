import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 댓글을 표현합니다.
 * 키워드: Comment, Bubble, 버블, 코멘트, 댓글, 답글, Reply
 * 속성: Solid
 */
const IconBubbleFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.0001 2.34998C6.67059 2.34998 2.35016 6.67043 2.35016 12C2.35016 17.3295 6.67059 21.65 12.0001 21.65C13.5385 21.65 14.9949 21.2894 16.2873 20.6475L18.0997 21.1418C18.5099 21.2537 18.8757 21.3535 19.1763 21.4066C19.4809 21.4604 19.8669 21.497 20.2526 21.3498C20.7579 21.1569 21.157 20.7578 21.3499 20.2525C21.4971 19.8668 21.4605 19.4808 21.4067 19.1762C21.3536 18.8756 21.2538 18.5098 21.142 18.0996L20.6476 16.2871C21.2895 14.9947 21.6501 13.5383 21.6501 12C21.6501 6.67043 17.3297 2.34998 12.0001 2.34998Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBubbleFill;
