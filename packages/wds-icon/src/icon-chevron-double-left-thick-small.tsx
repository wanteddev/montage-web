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
          d="M19.9198 6.41743C20.4275 5.90975 20.4275 5.08665 19.9198 4.57897C19.4121 4.07129 18.589 4.07129 18.0813 4.57897L11.5814 11.0789C11.0737 11.5866 11.0737 12.4097 11.5814 12.9174L18.0813 19.4173C18.589 19.925 19.4121 19.925 19.9198 19.4173C20.4275 18.9097 20.4275 18.0865 19.9198 17.5789L14.3391 11.9982L19.9198 6.41743ZM11.9194 6.41763C12.4271 5.90995 12.4271 5.08684 11.9194 4.57916C11.4118 4.07149 10.5886 4.07149 10.081 4.57916L3.58102 11.0791C3.07334 11.5868 3.07334 12.4099 3.58102 12.9176L10.081 19.4175C10.5886 19.9252 11.4118 19.9252 11.9194 19.4175C12.4271 18.9099 12.4271 18.0867 11.9194 17.5791L6.33872 11.9983L11.9194 6.41763Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleLeftThickSmall;
