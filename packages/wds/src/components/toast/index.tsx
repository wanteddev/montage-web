import { Box } from '@wanteddev/wds-engine';
import { forwardRef, useId, useMemo } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { composeEventHandlers } from '@radix-ui/primitive';
import { Slot } from '@radix-ui/react-slot';

import { FlexBox } from '../flex-box';
import { Typography } from '../typography';
import { PortalOrFragment } from '../portal-or-fragment';
import { AnimationPresence } from '../animation-presence';

import {
  firstOverlayStyle,
  messageStyle,
  secondOverlayStyle,
  textStyle,
  toastStyle,
  wrapperStyle,
} from './style';
import { useToastAnimation } from './hooks';
import { ToastProvider, useToastContext } from './contexts';
import {
  TOAST_CONTAINER_NAME,
  TOAST_CONTENT_NAME,
  TOAST_ICON_NAME,
  TOAST_NAME,
  toastIconComponent,
} from './constants';

import type { ElementType, ForwardedRef } from 'react';
import type {
  DefaultComponentPropsInternal,
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
import type {
  ToastContainerProps,
  ToastContentProps,
  ToastIconProps,
  ToastProps,
} from './types';

const Toast = forwardRef(
  <T extends ElementType = 'div'>(
    {
      duration: durationProp = 'short',
      variant = 'normal',
      onAnimationEnd,
      defaultOpen,
      open: openProp,
      onOpenChange,
      children,
      container,
      disablePortal,
      disableAnimation,
      forceMount,
      as,
      ...props
    }: PolymorphicPropsInternal<ToastProps, T>,
    forwardedRef: ForwardedRef<T>,
  ) => {
    const [open, setOpen] = useControllableState({
      defaultProp: defaultOpen ?? false,
      prop: openProp,
      onChange: onOpenChange,
    });

    const contentId = useId();

    const duration = useMemo(() => {
      if (typeof durationProp === 'number') {
        return durationProp;
      }

      switch (durationProp) {
        case 'long':
          return 5000;
        case 'short':
        default:
          return 3000;
      }
    }, [durationProp]);

    const {
      ref,
      handleAnimationEnd,
      handleMouseEnter,
      handleMouseLeave,
      style,
    } = useToastAnimation({
      open,
      setOpen,
      duration,
      onAnimationEnd,
      disablePortal,
      component: 'toast',
    });

    const ariaAttributes = useMemo(() => {
      if (variant === 'negative') {
        return {
          role: 'alert',
          'aria-live': 'assertive',
        };
      }

      return {
        role: variant === 'cautionary' ? 'alert' : 'status',
        'aria-live': 'polite',
      };
    }, [variant]);

    return (
      <AnimationPresence present={open || forceMount}>
        <PortalOrFragment
          disablePortal={disablePortal}
          container={
            container ??
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            globalThis?.document?.querySelector('#wds-region-manager-bottom')
          }
        >
          <Box
            aria-atomic
            {...ariaAttributes}
            aria-describedby={contentId}
            ref={forwardedRef}
            {...props}
            as={(as ?? 'div') as ElementType}
            onMouseEnter={composeEventHandlers(
              props.onMouseEnter,
              handleMouseEnter,
            )}
            onMouseLeave={composeEventHandlers(
              props.onMouseLeave,
              handleMouseLeave,
            )}
            data-status={open ? 'open' : 'close'}
            onAnimationEnd={handleAnimationEnd}
            style={{ ...style, ...props.style }}
            sx={[wrapperStyle({ disableAnimation }), props.sx]}
          >
            <Box ref={ref} sx={toastStyle} data-role="toast">
              <Box role="presentation" sx={firstOverlayStyle} />
              <Box role="presentation" sx={secondOverlayStyle} />
              <ToastProvider contentId={contentId} variant={variant}>
                {children}
              </ToastProvider>
            </Box>
          </Box>
        </PortalOrFragment>
      </AnimationPresence>
    );
  },
) as PolymorphicComponentInternal<ToastProps, 'div'>;

Toast.displayName = TOAST_NAME;

const ToastContainer = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ToastContainerProps, 'div'>
>((props, ref) => {
  return (
    <FlexBox
      gap="8px"
      alignItems="center"
      ref={ref}
      {...props}
      sx={[{ ['& svg']: { flexShrink: 0 } }, props.sx]}
    />
  );
});

ToastContainer.displayName = TOAST_CONTAINER_NAME;

const ToastIcon = forwardRef<HTMLElement, ToastIconProps>(
  ({ children, ...props }, ref) => {
    const { variant } = useToastContext(TOAST_ICON_NAME);

    const icon = children || toastIconComponent[variant];

    if (!icon) {
      return null;
    }

    return (
      <Slot ref={ref} {...props}>
        {icon}
      </Slot>
    );
  },
);

ToastIcon.displayName = TOAST_ICON_NAME;

const ToastContent = forwardRef<
  HTMLParagraphElement,
  DefaultComponentPropsInternal<ToastContentProps, 'p'>
>((props, ref) => {
  const { contentId } = useToastContext(TOAST_CONTENT_NAME);

  return (
    <Typography
      as="p"
      color="semantic.static.white"
      variant="body2"
      weight="bold"
      id={contentId}
      ref={ref}
      {...props}
      sx={[messageStyle, textStyle, props.sx]}
    />
  );
});

ToastContent.displayName = TOAST_CONTENT_NAME;

export { Toast, ToastContainer, ToastIcon, ToastContent };

export type {
  ToastProps,
  ToastContainerProps,
  ToastIconProps,
  ToastContentProps,
};
