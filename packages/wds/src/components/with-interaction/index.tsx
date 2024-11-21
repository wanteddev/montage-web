'use client';
import { Children, cloneElement, forwardRef, isValidElement } from 'react';
import { Box } from '@wanteddev/wds-engine';
import { Slot } from '@radix-ui/react-slot';
import { composeRefs } from '@radix-ui/react-compose-refs';

import { getWrapperStyle, interactionStyle } from './style';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { WithInteractionProps } from './types';

const WithInteraction = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<WithInteractionProps, 'div'>
>(
  (
    {
      variant = 'normal',
      children,
      scale,
      disabled,
      color,
      width,
      height,
      sx,
      ...props
    },
    forwardedRef,
  ) => {
    if (isValidElement(children)) {
      const childrenProps = { ...children.props };

      const ref = forwardedRef
        ? composeRefs(
            forwardedRef,
            (children as any).ref ?? children.props?.ref,
          )
        : undefined;

      childrenProps.children = (
        <>
          {childrenProps.children}
          <Interaction color={color} height={height} width={width} />
        </>
      );

      return (
        <Box
          as={Slot}
          {...props}
          sx={[
            getWrapperStyle({ disabled, variant, scale }),
            sx,
            childrenProps.sx,
          ]}
        >
          {cloneElement(children, {
            // @ts-ignore
            ...childrenProps,
            sx: undefined,
            ref,
            children: childrenProps.children,
          })}
        </Box>
      );
    }

    return Children.count(children) > 1 ? Children.only(null) : null;
  },
);

WithInteraction.displayName = 'WithInteraction';

export default WithInteraction;

const Interaction = ({
  color = 'palette.label.normal',
  width = '100%',
  height = '100%',
}: WithInteractionProps) => {
  return (
    <Box
      wds-component="with-interaction"
      role="presentation"
      sx={interactionStyle({ color, width, height })}
    />
  );
};
