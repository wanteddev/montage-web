import { Box } from '@wanteddev/wds-engine';
import { forwardRef, useId, useMemo } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { composeEventHandlers } from '@radix-ui/primitive';
import { Slot } from '@radix-ui/react-slot';

import FlexBox from '../flex-box';
import Typography from '../typography';
import PortalOrFragment from '../portal-or-fragment';

import {
  firstOverlayStyle,
  messageStyle,
  secondOverlayStyle,
  textStyle,
  toastStyle,
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

import type { ComponentProps, Ref } from 'react';
import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type {
  ToastContainerProps,
  ToastContentProps,
  ToastIconProps,
  ToastProps,
} from './types';

const Toast = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<ToastProps, 'div'>
>(
  (
    {
      duration: durationProp = 'short',
      variant = 'normal',
      onAnimationEnd,
      defaultOpen = false,
      open: openProp,
      onOpenChange,
      children,
      container,
      disablePortal,
      disableAnimation,
      ...props
    },
    forwardedRef,
  ) => {
    const [open = false, setOpen] = useControllableState({
      defaultProp: defaultOpen,
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
      containerStyle,
      isMounted,
      handleMouseEnter,
      handleMouseLeave,
      handleTransitionEnd,
    } = useToastAnimation({
      open,
      setOpen,
      duration,
      onAnimationEnd,
      disablePortal,
      disableAnimation,
    });

    const composedRefs = useComposedRefs(forwardedRef, ref);

    if (!isMounted) {
      return null;
    }

    return (
      <PortalOrFragment
        disablePortal={disablePortal}
        container={
          container ??
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          globalThis?.document?.querySelector('#wds-region-manager-bottom')
        }
      >
        <Box
          {...props}
          onMouseEnter={composeEventHandlers(
            props.onMouseEnter,
            handleMouseEnter,
          )}
          onMouseLeave={composeEventHandlers(
            props.onMouseLeave,
            handleMouseLeave,
          )}
          onTransitionEnd={composeEventHandlers(
            props.onTransitionEnd,
            handleTransitionEnd,
          )}
          style={{ ...containerStyle, ...props.style }}
          sx={[
            { transition: disableAnimation ? 'none' : 'all 0.2s ease' },
            props.sx,
          ]}
        >
          <Box
            ref={composedRefs}
            aria-atomic
            role={variant === 'negative' ? 'alert' : 'status'}
            aria-live={variant === 'negative' ? 'assertive' : 'polite'}
            sx={toastStyle}
            aria-describedby={contentId}
            data-role="toast"
          >
            <Box role="presentation" sx={firstOverlayStyle} />
            <Box role="presentation" sx={secondOverlayStyle} />
            <ToastProvider contentId={contentId} variant={variant}>
              {children}
            </ToastProvider>
          </Box>
        </Box>
      </PortalOrFragment>
    );
  },
);

Toast.displayName = TOAST_NAME;

const ToastContainer = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<ToastContainerProps, 'div'>
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

const ToastIcon = forwardRef<
  SVGSVGElement,
  DefaultComponentProps<ToastIconProps, 'svg'>
>(({ children, ...props }, ref) => {
  const { variant } = useToastContext(TOAST_ICON_NAME);

  const icon = children || toastIconComponent[variant];

  if (!icon) {
    return null;
  }

  return (
    <Slot
      ref={ref as Ref<HTMLElement>}
      {...(props as ComponentProps<typeof Slot>)}
    >
      {icon}
    </Slot>
  );
});

ToastIcon.displayName = TOAST_ICON_NAME;

const ToastContent = forwardRef<
  HTMLParagraphElement,
  DefaultComponentProps<ToastContentProps, 'p'>
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
