import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 댓글이나 대화를 추가할 때 사용합니다.
 * 키워드: Conversation, Comment, Add, Bubble, 추가, 코멘트, 대화, 댓글
 * 속성: Solid
 */
const IconBubblePlusFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.35022 12.0001C2.35022 6.67055 6.67066 2.3501 12.0002 2.3501C17.3297 2.3501 21.6501 6.67055 21.6501 12.0001C21.6501 13.5384 21.2895 14.9948 20.6477 16.2873L21.142 18.0997C21.2539 18.5098 21.3537 18.8758 21.4068 19.1763C21.4606 19.4809 21.4972 19.867 21.3499 20.2526C21.157 20.7579 20.7579 21.157 20.2527 21.3499C19.867 21.4971 19.481 21.4605 19.1764 21.4067C18.8758 21.3537 18.5099 21.2538 18.0997 21.1419L16.2873 20.6476C14.9949 21.2895 13.5385 21.6501 12.0002 21.6501C6.67066 21.6501 2.35022 17.3296 2.35022 12.0001ZM12.9006 8.00024C12.9006 7.50319 12.4977 7.10024 12.0006 7.10024C11.5036 7.10024 11.1006 7.50319 11.1006 8.00024V11.1002H8.00066C7.5036 11.1002 7.10066 11.5032 7.10066 12.0002C7.10066 12.4973 7.5036 12.9002 8.00066 12.9002H11.1006V16.0002C11.1006 16.4973 11.5036 16.9002 12.0006 16.9002C12.4977 16.9002 12.9006 16.4973 12.9006 16.0002V12.9002H16.0006C16.4977 12.9002 16.9006 12.4973 16.9006 12.0002C16.9006 11.5032 16.4977 11.1002 16.0006 11.1002H12.9006V8.00024Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBubblePlusFill;
