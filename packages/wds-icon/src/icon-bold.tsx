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
        d="M8.65 20.5C7.80992 20.5 7.38988 20.5 7.06901 20.3365C6.78677 20.1927 6.5573 19.9632 6.41349 19.681C6.25 19.3601 6.25 18.9401 6.25 18.1V5.89902C6.25 5.05894 6.25 4.63891 6.41349 4.31804C6.5573 4.03579 6.78677 3.80632 7.06901 3.66251C7.38988 3.49902 7.80992 3.49902 8.65 3.49902H11.9395C15.1566 3.49902 17.2934 5.26017 17.2934 7.86667C17.2934 9.6513 16.2837 10.8958 14.4756 11.4594V11.5533C16.8355 12.0817 18.1622 13.5258 18.1622 15.6862C18.1622 18.5745 15.814 20.5 12.3152 20.5H8.65ZM12.3387 18.5745C14.6869 18.5745 16.0489 17.4473 16.0489 15.5453C16.0489 13.6432 14.6165 12.5161 12.1509 12.5161H8.31641V18.5745H12.3387ZM11.7751 10.6375C13.9355 10.6375 15.18 9.67479 15.18 8.03105C15.18 6.38731 14.0059 5.42455 11.963 5.42455H8.31641V10.6375H11.7751Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBold;
