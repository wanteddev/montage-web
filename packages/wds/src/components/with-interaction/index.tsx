'use client';
import { Children, cloneElement, isValidElement } from 'react';
import {
  Box,
  ClassNames,
  css,
  getColorByToken,
  useTheme,
} from '@wanteddev/wds-engine';

import { getWrapperStyle } from './style';

import type { WithInteractionProps } from './types';

const Interaction = ({
  color = 'palette.label.normal',
  width = '100%',
  height = '100%',
}: WithInteractionProps) => {
  return (
    <Box
      wds-component="with-interaction"
      role="presentation"
      sx={(theme) => css`
        overflow: hidden;
        position: absolute;
        z-index: 0;
        box-sizing: content-box;
        border-radius: inherit;
        opacity: ${theme.opacity[0]};
        background-color: ${getColorByToken(theme, color)};
        will-change: opacity, transform;
        transition:
          opacity 0.15s ease,
          transform 0.15s ease;
        transform-origin: center;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        ${width &&
        css`
          width: ${width};
        `}
        ${height &&
        css`
          height: ${height};
        `}
      `}
    />
  );
};
const WithInteraction = ({
  variant = 'normal',
  children,
  scale,
  disabled,
  ...props
}: WithInteractionProps) => {
  const theme = useTheme();

  if (isValidElement(children)) {
    const childrenProps = { ...children.props };

    childrenProps.children = (
      <>
        {childrenProps.children}
        <Interaction {...props} />
      </>
    );

    if (childrenProps.sx) {
      return cloneElement(children, {
        ...childrenProps,
        ref: (children as any).ref ?? children.props.ref,
        sx: [
          css(getWrapperStyle(theme, { variant, scale, disabled })),
          ...(Array.isArray(childrenProps.sx)
            ? childrenProps.sx
            : [childrenProps.sx]),
        ],
      });
    }

    return (
      <ClassNames>
        {({ css: className }) => (
          <>
            {cloneElement(children, {
              ...childrenProps,
              className: childrenProps?.className
                ? `${className(getWrapperStyle(theme, { variant, scale, disabled }))} ${childrenProps?.className}`
                : className(
                    getWrapperStyle(theme, { variant, scale, disabled }),
                  ),
              ref: (children as any).ref ?? children.props.ref,
            })}
          </>
        )}
      </ClassNames>
    );
  }

  return Children.count(children) > 1 ? Children.only(null) : null;
};

WithInteraction.displayName = 'WithInteraction';

export default WithInteraction;
