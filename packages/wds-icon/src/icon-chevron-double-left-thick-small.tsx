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
          d="M19.9198 6.41742C20.4274 5.90974 20.4274 5.08663 19.9198 4.57896C19.4121 4.07128 18.589 4.07128 18.0813 4.57896L11.5814 11.0789C11.0737 11.5866 11.0737 12.4097 11.5814 12.9173L18.0813 19.4173C18.589 19.925 19.4121 19.925 19.9198 19.4173C20.4274 18.9096 20.4274 18.0865 19.9198 17.5788L14.3391 11.9981L19.9198 6.41742ZM11.9194 6.41761C12.4271 5.90993 12.4271 5.08683 11.9194 4.57915C11.4118 4.07148 10.5886 4.07148 10.081 4.57915L3.58104 11.0791C3.07337 11.5868 3.07337 12.4099 3.58104 12.9175L10.081 19.4175C10.5886 19.9252 11.4118 19.9252 11.9194 19.4175C12.4271 18.9098 12.4271 18.0867 11.9194 17.579L6.33873 11.9983L11.9194 6.41761Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleLeftThickSmall;
