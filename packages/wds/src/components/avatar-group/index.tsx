'use client';
import { Children, forwardRef } from 'react';

import FlexBox from '../flex-box';

import { avatarGroupStyle } from './style';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { AvatarGroupProps } from './types';

const AvatarGroup = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<AvatarGroupProps, 'div'>
>(({ size = 'small', xs, sm, md, lg, xl, children, ...props }, ref) => {
  const reverseChildren = Children.toArray(children).reverse();

  return (
    <FlexBox
      flexDirection="row-reverse"
      ref={ref}
      {...props}
      sx={[avatarGroupStyle({ size, xs, sm, md, lg, xl }), props.sx]}
    >
      {reverseChildren}
    </FlexBox>
  );
});

AvatarGroup.displayName = 'AvatarGroup';

export default AvatarGroup;
