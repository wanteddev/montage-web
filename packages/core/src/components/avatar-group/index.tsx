import { Children, forwardRef } from 'react';

import { FlexBox } from '../flex-box';
import { Typography } from '../typography';
import { TextButtonProvider } from '../text-button/contexts';
import { typographyStyle } from '../../utils';

import { avatarGroupStyle } from './style';

import type { DefaultComponentPropsInternal } from '@montage-ui/engine';
import type { AvatarGroupContentProps, AvatarGroupProps } from './types';

const MAX_AVATAR_COUNT = 5;

const AvatarGroup = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<AvatarGroupProps, 'div'>
>(
  (
    { size = 'small', xs, sm, md, lg, xl, children, trailingContent, ...props },
    ref,
  ) => {
    const reverseChildren = Children.toArray(children)
      .slice(0, MAX_AVATAR_COUNT)
      .reverse();

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

const AvatarGroupContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<AvatarGroupContentProps, 'div'>
>(({ variant = 'text', children, ...props }, ref) => {
  switch (variant) {
    case 'text-button':
      return (
        <FlexBox
          flexShrink={0}
          alignItems="center"
          data-component="avatar-group-content"
          ref={ref}
          {...props}
          sx={[
            {
              ['[data-component="text-button"] > span']: typographyStyle(
                'label1',
                'medium',
              ),
            },
            props.sx,
          ]}
        >
          <TextButtonProvider assistive="semantic.foreground.neutral.secondary">
            {children}
          </TextButtonProvider>
        </FlexBox>
      );
    case 'text':
    default:
      return (
        <Typography
          data-component="avatar-group-content"
          variant="label1"
          weight="medium"
          as="span"
          {...props}
          color="semantic.foreground.neutral.secondary"
          ref={ref}
        >
          {children}
        </Typography>
      );
  }
});

AvatarGroupContent.displayName = 'AvatarGroupContent';

export { AvatarGroup, AvatarGroupContent };

export type { AvatarGroupProps, AvatarGroupContentProps };
