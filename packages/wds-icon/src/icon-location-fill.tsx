import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconLocationFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
      as="svg"
      ref={ref}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.67855 5.05045C7.32699 3.0885 9.66331 2.1001 11.997 2.1001C14.3304 2.1001 16.6571 3.07828 18.3158 5.0508C21.1808 8.45715 20.736 13.4829 17.6546 16.5754L17.6534 16.5765C15.9048 18.3251 13.8926 20.4505 13.0484 21.3422C12.9909 21.403 12.9387 21.458 12.8925 21.5069C12.4073 22.0245 11.5869 22.0245 11.1016 21.5069C11.0554 21.4581 11.0032 21.403 10.9457 21.3422C10.1015 20.4505 8.08927 18.3251 6.34064 16.5765L6.3395 16.5754C3.25886 13.4836 2.81253 8.44765 5.67855 5.05045ZM9.21703 10.3401C9.21703 8.80304 10.46 7.5601 11.997 7.5601C13.5341 7.5601 14.777 8.80304 14.777 10.3401C14.777 11.8772 13.5341 13.1201 11.997 13.1201C10.46 13.1201 9.21703 11.8772 9.21703 10.3401Z"
      />
    </Box>
  );
});

export default IconLocationFill;
