import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 컴포넌트를 표현합니다.
 * 키워드: Component
 * 속성: Solid
 */
const IconComponentFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M1.85222 12.9534C1.32502 12.4261 1.32502 11.5714 1.85222 11.0442L4.85743 8.03896C5.38463 7.51175 6.23941 7.51175 6.76662 8.03896L9.77182 11.0442C10.299 11.5714 10.299 12.4261 9.77182 12.9534L6.76662 15.9586C6.23941 16.4858 5.38464 16.4858 4.85743 15.9586L1.85222 12.9534Z"
        fill="currentColor"
      />
      <path
        d="M8.04003 19.1413C7.51282 18.6141 7.51282 17.7594 8.04003 17.2322L11.0452 14.2269C11.5724 13.6997 12.4272 13.6997 12.9544 14.2269L15.9596 17.2322C16.4868 17.7594 16.4868 18.6141 15.9596 19.1413L12.9544 22.1465C12.4272 22.6738 11.5724 22.6738 11.0452 22.1465L8.04003 19.1413Z"
        fill="currentColor"
      />
      <path
        d="M8.04003 4.85764C7.51282 5.38485 7.51282 6.23962 8.04003 6.76683L11.0452 9.77203C11.5724 10.2992 12.4272 10.2992 12.9544 9.77203L15.9596 6.76683C16.4868 6.23962 16.4868 5.38485 15.9596 4.85764L12.9544 1.85244C12.4272 1.32523 11.5724 1.32523 11.0452 1.85244L8.04003 4.85764Z"
        fill="currentColor"
      />
      <path
        d="M14.2276 12.9543C13.7004 12.4271 13.7004 11.5723 14.2276 11.0451L17.2328 8.03994C17.76 7.51273 18.6147 7.51273 19.142 8.03994L22.1472 11.0451C22.6744 11.5723 22.6744 12.4271 22.1472 12.9543L19.142 15.9595C18.6147 16.4867 17.76 16.4867 17.2328 15.9595L14.2276 12.9543Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconComponentFill;
