import { forwardRef } from 'react';
import { Box, type DefaultComponentPropsInternal } from '@wanteddev/wds-engine';

import { FlexBox } from '../flex-box';

import { LOADING_NAME } from './constants';
import {
  loadingCircularAnimatedSvgStyle,
  loadingStyle,
  loadingWantedAnimatedSvgStyle,
} from './style';

import type { LoadingProps } from './types';
import type { ForwardedRef } from 'react';

const Loading = forwardRef(
  (
    {
      variant = 'wanted',
      size = '32px',
      xl,
      lg,
      md,
      sm,
      xs,
      sx,
      ...props
    }: DefaultComponentPropsInternal<LoadingProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const loadingSvgRender = () => {
      switch (variant) {
        case 'wanted':
          return <LoadingWantedAnimatedSvg />;
        case 'circular':
          return <LoadingCircularAnimatedSvg />;
      }
    };

    return (
      <FlexBox
        ref={ref}
        {...props}
        sx={[
          loadingStyle({
            size,
            xl,
            lg,
            md,
            sm,
            xs,
          }),
          sx,
        ]}
      >
        {loadingSvgRender()}
      </FlexBox>
    );
  },
);

Loading.displayName = LOADING_NAME;

const LoadingWantedAnimatedSvg = () => {
  return (
    <Box
      as="svg"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      sx={loadingWantedAnimatedSvgStyle}
    >
      <g>
        <path
          className="circle"
          d="M2.09998 12.0001C2.09998 6.53248 6.53236 2.1001 12 2.1001C17.4676 2.1001 21.9 6.53248 21.9 12.0001C21.9 17.4677 17.4676 21.9001 12 21.9001C6.53236 21.9001 2.09998 17.4677 2.09998 12.0001Z"
        />
        <path
          className="triangle"
          d="M8.53604 5C9.67283 3.03102 10.2412 2.04653 10.9833 1.71614C11.6306 1.42795 12.3697 1.42795 13.017 1.71614C13.7591 2.04653 14.3274 3.03102 15.4642 5L19.7944 12.5C20.9312 14.469 21.4996 15.4535 21.4146 16.2613C21.3406 16.966 20.971 17.6061 20.3978 18.0225C19.7406 18.5 18.6039 18.5 16.3303 18.5H7.67001C5.39643 18.5 4.25964 18.5 3.60247 18.0225C3.02927 17.6061 2.65969 16.966 2.58563 16.2613C2.50072 15.4535 3.06912 14.469 4.20591 12.5L8.53604 5Z"
        />
        <path
          className="square"
          d="M8.55001 2.85001H8.51231C7.70426 2.85 7.0434 2.84999 6.50633 2.89387C5.95041 2.93929 5.44833 3.03617 4.97944 3.27508C4.24561 3.64899 3.64899 4.24561 3.27508 4.97944C3.03617 5.44833 2.93929 5.95041 2.89387 6.50632C2.84999 7.04339 2.85 7.70422 2.85001 8.51224V8.55001V15.45V15.4877C2.85 16.2957 2.84999 16.9566 2.89387 17.4937C2.93929 18.0496 3.03617 18.5517 3.27508 19.0206C3.64899 19.7544 4.24561 20.351 4.97944 20.7249C5.44833 20.9638 5.95041 21.0607 6.50633 21.1061C7.0434 21.15 7.70425 21.15 8.5123 21.15H8.55001H15.45H15.4877C16.2958 21.15 16.9566 21.15 17.4937 21.1061C18.0496 21.0607 18.5517 20.9638 19.0206 20.7249C19.7544 20.351 20.351 19.7544 20.7249 19.0206C20.9638 18.5517 21.0607 18.0496 21.1061 17.4937C21.15 16.9566 21.15 16.2958 21.15 15.4877V15.45V8.55001V8.5123C21.15 7.70425 21.15 7.0434 21.1061 6.50632C21.0607 5.95041 20.9638 5.44833 20.7249 4.97944C20.351 4.24561 19.7544 3.64899 19.0206 3.27508C18.5517 3.03617 18.0496 2.93929 17.4937 2.89387C16.9566 2.84999 16.2958 2.85 15.4877 2.85001H15.45H8.55001Z"
        />
      </g>
    </Box>
  );
};

const LoadingCircularAnimatedSvg = () => {
  return (
    <Box
      as="svg"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      sx={loadingCircularAnimatedSvgStyle}
    >
      <circle cx="14" cy="14" r="12.5" />
    </Box>
  );
};

export { Loading };

export type { LoadingProps };
