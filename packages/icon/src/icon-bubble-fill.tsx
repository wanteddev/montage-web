import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M11.9999 2.34998C6.67035 2.34998 2.34991 6.67043 2.34991 12C2.34991 17.3295 6.67035 21.65 11.9999 21.65C13.5382 21.65 14.9946 21.2894 16.287 20.6475L18.0994 21.1418C18.5096 21.2537 18.8755 21.3535 19.1761 21.4066C19.4806 21.4604 19.8667 21.497 20.2524 21.3498C20.7576 21.1569 21.1567 20.7578 21.3496 20.2525C21.4969 19.8668 21.4602 19.4808 21.4065 19.1762C21.3534 18.8756 21.2536 18.5098 21.1417 18.0996L20.6474 16.2871C21.2892 14.9947 21.6498 13.5383 21.6498 12C21.6498 6.67043 17.3294 2.34998 11.9999 2.34998Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBubbleFill;
