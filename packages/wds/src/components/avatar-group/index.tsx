import { Children, forwardRef } from 'react';

import { FlexBox } from '../flex-box';

import { avatarGroupStyle } from './style';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type { AvatarGroupProps } from './types';

const AvatarGroup = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<AvatarGroupProps, 'div'>
>(
  (
    { size = 'small', xs, sm, md, lg, xl, children, trailingContent, ...props },
    ref,
  ) => {
    const reverseChildren = Children.toArray(children).reverse();

    return (
      <FlexBox
        ref={ref}
        alignItems="center"
        {...props}
        sx={[avatarGroupStyle({ size, xs, sm, md, lg, xl }), props.sx]}
      >
        <FlexBox
          flexDirection="row-reverse"
          data-role="avatar-group-content"
          alignItems="center"
        >
          {reverseChildren}
        </FlexBox>

        {trailingContent}
      </FlexBox>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';

export { AvatarGroup };

export type { AvatarGroupProps };
