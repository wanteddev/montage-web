import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronDoubleLeftThick = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
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
          d="M21.4194 4.91748C21.9271 4.4098 21.9271 3.58668 21.4194 3.079C20.9117 2.57132 20.0886 2.57132 19.5809 3.079L11.581 11.079C11.0733 11.5867 11.0733 12.4098 11.581 12.9175L19.5809 20.9175C20.0886 21.4252 20.9117 21.4252 21.4194 20.9175C21.9271 20.4098 21.9271 19.5867 21.4194 19.079L14.3387 11.9982L21.4194 4.91748ZM11.9194 4.91768C12.4271 4.40999 12.4271 3.58688 11.9194 3.0792C11.4117 2.57152 10.5886 2.57152 10.0809 3.0792L2.08096 11.0792C1.57328 11.5869 1.57328 12.41 2.08096 12.9177L10.0809 20.9177C10.5886 21.4254 11.4117 21.4254 11.9194 20.9177C12.4271 20.41 12.4271 19.5869 11.9194 19.0792L4.83867 11.9984L11.9194 4.91768Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleLeftThick;
