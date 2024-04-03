'use client';
import { Children, forwardRef } from 'react';

import FlexBox from '../flex-box';

import { avatarGroupStyle } from './style';

import type { MergeElementProps } from '../../types';
import type { AvatarGroupProps } from './types';

type Props = MergeElementProps<'div', AvatarGroupProps>;

const AvatarGroup = forwardRef<HTMLDivElement, Props>(
  ({ size = 'small', xs, sm, md, lg, xl, children, ...props }, ref) => {
    const reverseChildren = Children.toArray(children).reverse();

    return (
      <FlexBox
        flexDirection="row-reverse"
        ref={ref}
        css={avatarGroupStyle({ size, xs, sm, md, lg, xl })}
        {...props}
      >
        {reverseChildren}
      </FlexBox>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';

export default AvatarGroup;
