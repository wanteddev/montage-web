'use client';
import { ClassNames, css, useTheme } from '@emotion/react';
import {
  Children,
  type PropsWithChildren,
  cloneElement,
  forwardRef,
  isValidElement,
} from 'react';
import { composeRefs } from '@radix-ui/react-compose-refs';

import { getColorByToken } from '@/utils/color';

import {
  activeInteractionStyle,
  focusInteractionStyle,
  focusVisibleInteractionStyle,
  hoverInteractionStyle,
} from './style';

import type { CSSProperties } from 'react';
import type { ThemeColorsToken } from '@/types';

type Props = PropsWithChildren<{
  color?: ThemeColorsToken;
  disabled?: boolean;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  scale?: boolean;
  variant?: 'normal' | 'light' | 'strong';
}>;

const Interaction = ({
  color = 'palette.label.normal',
  width = '100%',
  height = '100%',
}: Props) => {
  return (
    <div
      wds-component="with-interaction"
      role="presentation"
      css={(theme) => css`
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

const Clone = forwardRef<any, Props & { className: string }>(
  (props, forwardedRef) => {
    const { children, className, ...others } = props;

    if (isValidElement(children)) {
      const childrenProps = { ...children.props };

      childrenProps.children = (
        <>
          {childrenProps.children}
          <Interaction {...others} />
        </>
      );

      return cloneElement(children, {
        ...childrenProps,
        className: childrenProps?.className
          ? `${className} ${childrenProps?.className}`
          : className,
        ref: forwardedRef
          ? composeRefs(forwardedRef, (children as any).ref)
          : (children as any).ref,
      });
    }

    return Children.count(children) > 1 ? Children.only(null) : null;
  },
);

const WithInteraction = ({
  variant = 'normal',
  children,
  scale,
  ...props
}: Props) => {
  const theme = useTheme();

  return (
    <ClassNames>
      {({ css: className }) => (
        <Clone
          className={className`
          position: relative;

          &:focus-visible {
            outline: solid 2px Highlight;
            outline: solid 2px -webkit-focus-ring-color;
          }

          ${
            !props.disabled &&
            css`
              &:hover > [wds-component='with-interaction'] {
                ${hoverInteractionStyle(theme, variant)}
              }
              &:focus > [wds-component='with-interaction'] {
                ${focusInteractionStyle(theme, variant)}
              }
              &:active > [wds-component='with-interaction'] {
                ${activeInteractionStyle(theme, variant)}
              }
              &:focus-visible > [wds-component='with-interaction'] {
                ${focusVisibleInteractionStyle(theme)}
              }

              ${scale &&
              css`
                & > [wds-component='with-interaction'] {
                  transform: translate(-50%, -50%) scale(0.95);
                }

                &:hover > [wds-component='with-interaction'] {
                  transform: translate(-50%, -50%) scale(1);
                }
              `}
            `
          }
          `}
          {...props}
        >
          {children}
        </Clone>
      )}
    </ClassNames>
  );
};

WithInteraction.displayName = 'WithInteraction';

export default WithInteraction;
