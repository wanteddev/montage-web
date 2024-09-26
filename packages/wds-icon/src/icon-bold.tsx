import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconBold = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.64996 20.4999C7.80988 20.4999 7.38984 20.4999 7.06898 20.3364C6.78674 20.1926 6.55727 19.9631 6.41346 19.6809C6.24997 19.36 6.24997 18.94 6.24997 18.0999V5.89899C6.24997 5.05892 6.24997 4.63888 6.41346 4.31802C6.55727 4.03577 6.78674 3.8063 7.06898 3.6625C7.38984 3.49901 7.80988 3.49901 8.64996 3.49901H11.9395C15.1565 3.49901 17.2933 5.26015 17.2933 7.86663C17.2933 9.65126 16.2836 10.8958 14.4755 11.4594V11.5533C16.8354 12.0816 18.1622 13.5258 18.1622 15.6861C18.1622 18.5744 15.814 20.4999 12.3152 20.4999H8.64996ZM12.3387 18.5744C14.6868 18.5744 16.0488 17.4472 16.0488 15.5452C16.0488 13.6432 14.6164 12.516 12.1508 12.516H8.31637V18.5744H12.3387ZM11.7751 10.6375C13.9354 10.6375 15.18 9.67474 15.18 8.03101C15.18 6.38728 14.0059 5.42452 11.9629 5.42452H8.31637V10.6375H11.7751Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBold;
