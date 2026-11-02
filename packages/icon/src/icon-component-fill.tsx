import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M1.85244 12.9534C1.32523 12.4261 1.32523 11.5714 1.85244 11.0442L4.85764 8.03896C5.38485 7.51175 6.23962 7.51175 6.76683 8.03896L9.77203 11.0442C10.2992 11.5714 10.2992 12.4261 9.77203 12.9534L6.76683 15.9586C6.23962 16.4858 5.38485 16.4858 4.85764 15.9586L1.85244 12.9534Z"
        fill="currentColor"
      />
      <path
        d="M8.04024 19.1413C7.51303 18.6141 7.51303 17.7594 8.04024 17.2322L11.0454 14.2269C11.5727 13.6997 12.4274 13.6997 12.9546 14.2269L15.9598 17.2322C16.487 17.7594 16.487 18.6141 15.9598 19.1413L12.9546 22.1465C12.4274 22.6738 11.5727 22.6738 11.0454 22.1465L8.04024 19.1413Z"
        fill="currentColor"
      />
      <path
        d="M8.04024 4.85764C7.51303 5.38485 7.51303 6.23962 8.04024 6.76683L11.0454 9.77203C11.5727 10.2992 12.4274 10.2992 12.9546 9.77203L15.9598 6.76683C16.487 6.23962 16.487 5.38485 15.9598 4.85764L12.9546 1.85244C12.4274 1.32523 11.5727 1.32523 11.0454 1.85244L8.04024 4.85764Z"
        fill="currentColor"
      />
      <path
        d="M14.2278 12.9543C13.7006 12.4271 13.7006 11.5723 14.2278 11.0451L17.233 8.03994C17.7602 7.51273 18.615 7.51273 19.1422 8.03994L22.1474 11.0451C22.6746 11.5723 22.6746 12.4271 22.1474 12.9543L19.1422 15.9595C18.615 16.4867 17.7602 16.4867 17.233 15.9595L14.2278 12.9543Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconComponentFill;
