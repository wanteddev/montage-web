import { Box } from '@wanteddev/wds-engine';
import { forwardRef, useId, useMemo } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { composeEventHandlers } from '@radix-ui/primitive';

import FlexBox from '../flex-box';
import Typography from '../typography';
import { useToastAnimation } from '../toast/hooks';
import { ellipsisTypographyStyle } from '../../utils';
import TextButton from '../text-button';
import PortalOrFragment from '../portal-or-fragment';
import { AnimationPresence } from '../animation-presence';

import { SnackbarProvider, useSnackbarContext } from './contexts';
import {
  SNACKBAR_ACTION_NAME,
  SNACKBAR_CONTENT_NAME,
  SNACKBAR_DESCRIPTION_NAME,
  SNACKBAR_EXTRA_CONTENT_NAME,
  SNACKBAR_HEADING_NAME,
  SNACKBAR_NAME,
} from './constants';
import {
  firstOverlayStyle,
  fullWidthFlexBoxStyle,
  messageStyle,
  secondOverlayStyle,
  snackbarActionStyle,
  snackbarStyle,
  textStyle,
  wrapperStyle,
} from './style';

import type { ElementType, ForwardedRef } from 'react';
import type {
  DefaultComponentProps,
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type {
  SnackbarActionProps,
  SnackbarContentProps,
  SnackbarDescriptionProps,
  SnackbarExtraContentProps,
  SnackbarHeadingProps,
  SnackbarProps,
} from './types';

const Snackbar = forwardRef(
  <T extends ElementType = 'div'>(
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
      forceMount = false,
      disableAnimation,
      ...props
    }: PolymorphicProps<SnackbarProps, T>,
    forwardedRef: ForwardedRef<T>,
  ) => {
    const [open = false, setOpen] = useControllableState({
      defaultProp: defaultOpen,
      prop: openProp,
      onChange: onOpenChange,
    });

    const headingId = useId();
    const descriptionId = useId();

    const duration = useMemo(() => {
      if (typeof durationProp === 'number') {
        return durationProp;
      }

      switch (durationProp) {
        case 'long':
          return 16000;
        case 'short':
        default:
          return 4000;
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
      component: 'snackbar',
    });

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
            {...props}
            ref={forwardedRef}
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
            <Box
              ref={ref}
              aria-atomic
              role="status"
              aria-live="polite"
              sx={snackbarStyle}
              aria-describedby={descriptionId}
              aria-labelledby={headingId}
              data-role="snackbar"
            >
              <Box role="presentation" sx={firstOverlayStyle} />
              <Box role="presentation" sx={secondOverlayStyle} />
              <FlexBox
                gap="12px"
                alignItems="center"
                justifyContent="space-between"
                data-role="snackbar-container"
                sx={fullWidthFlexBoxStyle}
              >
                <SnackbarProvider
                  headingId={headingId}
                  descriptionId={descriptionId}
                  variant={variant}
                >
                  {children}
                </SnackbarProvider>
              </FlexBox>
            </Box>
          </Box>
        </PortalOrFragment>
      </AnimationPresence>
    );
  },
) as PolymorphicComponent<SnackbarProps, 'div'>;

Snackbar.displayName = SNACKBAR_NAME;

const SnackbarContent = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<SnackbarContentProps, 'div'>
>(({ extraContent, children, ...props }, ref) => {
  return (
    <FlexBox gap="12px" alignItems="center" ref={ref} {...props}>
      {extraContent}
      <FlexBox
        flexDirection="column"
        sx={messageStyle}
        data-role="snackbar-content-area"
      >
        {children}
      </FlexBox>
    </FlexBox>
  );
});

SnackbarContent.displayName = SNACKBAR_CONTENT_NAME;

const SnackbarExtraContent = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<SnackbarExtraContentProps, 'div'>
>((props, ref) => {
  return (
    <FlexBox
      ref={ref}
      flexShrink={0}
      {...props}
      sx={[{ width: 'fit-content', height: 'fit-content' }, props.sx]}
    />
  );
});

SnackbarExtraContent.displayName = SNACKBAR_EXTRA_CONTENT_NAME;

const SnackbarHeading = forwardRef<
  HTMLParagraphElement,
  DefaultComponentProps<SnackbarHeadingProps, 'p'>
>((props, ref) => {
  const { headingId } = useSnackbarContext(SNACKBAR_HEADING_NAME);
  return (
    <Typography
      as="p"
      id={headingId}
      ref={ref}
      color="semantic.static.white"
      variant="body2"
      weight="bold"
      {...props}
      sx={[textStyle, props.sx]}
    />
  );
});

SnackbarHeading.displayName = SNACKBAR_HEADING_NAME;

const SnackbarDescription = forwardRef<
  HTMLParagraphElement,
  DefaultComponentProps<SnackbarDescriptionProps, 'p'>
>((props, ref) => {
  const { descriptionId } = useSnackbarContext(SNACKBAR_DESCRIPTION_NAME);
  return (
    <Typography
      as="p"
      id={descriptionId}
      ref={ref}
      color="semantic.static.white"
      variant="label2"
      weight="regular"
      {...props}
      sx={[textStyle, ellipsisTypographyStyle(2), props.sx]}
    />
  );
});

SnackbarDescription.displayName = SNACKBAR_DESCRIPTION_NAME;

const SnackbarAction = forwardRef<
  HTMLButtonElement,
  PolymorphicProps<SnackbarActionProps, 'button'>
>((props, ref) => {
  return (
    <TextButton
      ref={ref}
      variant="assistive"
      size="medium"
      {...props}
      sx={[snackbarActionStyle, props.sx]}
    />
  );
}) as PolymorphicComponent<SnackbarActionProps, 'button'>;

SnackbarAction.displayName = SNACKBAR_ACTION_NAME;

export {
  Snackbar,
  SnackbarContent,
  SnackbarExtraContent,
  SnackbarHeading,
  SnackbarDescription,
  SnackbarAction,
};
