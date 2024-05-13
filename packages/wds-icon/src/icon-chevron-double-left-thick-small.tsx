import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronDoubleLeftThickSmall = forwardRef<SVGSVGElement, Props>(
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
          d="M19.9201 6.41748C20.4278 5.9098 20.4278 5.08668 19.9201 4.579C19.4124 4.07132 18.5893 4.07132 18.0816 4.579L11.5816 11.079C11.0739 11.5867 11.0739 12.4098 11.5816 12.9175L18.0816 19.4175C18.5893 19.9252 19.4124 19.9252 19.9201 19.4175C20.4278 18.9098 20.4278 18.0867 19.9201 17.579L14.3393 11.9982L19.9201 6.41748ZM11.9197 6.41768C12.4274 5.90999 12.4274 5.08688 11.9197 4.5792C11.412 4.07152 10.5889 4.07152 10.0812 4.5792L3.5812 11.0792C3.07352 11.5869 3.07352 12.41 3.5812 12.9177L10.0812 19.4177C10.5889 19.9254 11.412 19.9254 11.9197 19.4177C12.4274 18.91 12.4274 18.0869 11.9197 17.5792L6.33892 11.9984L11.9197 6.41768Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleLeftThickSmall;
