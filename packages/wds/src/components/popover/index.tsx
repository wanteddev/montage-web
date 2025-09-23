import { forwardRef, useId } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Slot } from '@radix-ui/react-slot';
import { composeEventHandlers } from '@radix-ui/primitive';
import { IconClose } from '@wanteddev/wds-icon';

import { DismissableLayer } from '../dismissable-layer';
import { Popper, PopperAnchor, PopperContent } from '../popper';
import { FlexBox } from '../flex-box';
import { FocusScope } from '../focus-scope';
import { createScope } from '../../hooks/internal/use-scope-context';
import { AnimationPresence } from '../animation-presence';
import { IconButton } from '../icon-button';
import { TextButtonProvider } from '../text-button/contexts';
import { Typography } from '../typography';
import { isElementDisabled } from '../../utils/internal/element';

import { PopoverProvider, usePopoverContext } from './contexts';
import {
  POPOVER_CONTENT_NAME,
  POPOVER_NAME,
  POPOVER_TRIGGER_NAME,
} from './constants';
import { popoverStyle } from './style';

import type { ScopedProps } from '../../hooks/internal/use-scope-context';
import type {
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
} from './types';
import type { ElementType, ForwardedRef } from 'react';
import type {
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';

const usePopoverScope = createScope('Popper');

const Popover = ({
  open: originOpen,
  defaultOpen,
  onOpenChange,
  children,
  __scopePopover = 'Popover',
}: ScopedProps<PopoverProps, 'Popover'>) => {
  const triggerId = useId();
  const contentId = useId();

  const [open = false, setOpen] = useControllableState({
    prop: originOpen,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const scopes = usePopoverScope(__scopePopover);

  return (
    <PopoverProvider
      scope={__scopePopover}
      triggerId={triggerId}
      contentId={contentId}
      open={open}
      onOpenChange={setOpen}
    >
      <Popper {...scopes}>{children}</Popper>
    </PopoverProvider>
  );
};

Popover.displayName = POPOVER_NAME;

const PopoverTrigger = forwardRef<HTMLElement, PopoverTriggerProps>(
  (
    {
      __scopePopover = 'Popover',
      ...props
    }: ScopedProps<PopoverTriggerProps, 'Popover'>,
    ref,
  ) => {
    const { contentId, triggerId, open, onOpenChange } = usePopoverContext(
      POPOVER_TRIGGER_NAME,
      __scopePopover,
    );

    const scopes = usePopoverScope(__scopePopover);

    return (
      <PopperAnchor {...scopes}>
        <Slot
          {...props}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={contentId}
          id={triggerId}
          ref={ref}
          onClick={composeEventHandlers(props.onClick, (e) => {
            if (!open && !isElementDisabled(e.currentTarget)) {
              onOpenChange(true);
            }
          })}
        />
      </PopperAnchor>
    );
  },
);

PopoverTrigger.displayName = POPOVER_TRIGGER_NAME;

const PopoverContent = forwardRef(
  <T extends ElementType = 'div'>(
    {
      position,
      offset = 10,
      loop = true,
      trapped = true,
      children,
      disablePortal,
      container,
      trappedContent = false,
      onMountAutoFocus,
      onUnmountAutoFocus,
      referenceHidden = false,
      referenceHiddenOffsets,
      setContext,
      wrapperProps,
      forceMount = false,
      as,
      onInteractOutside,
      onFocusOutside,
      onPointerDownOutside,
      onDismiss,
      disableOutsidePointerEvents = true,
      closeButton = false,
      action,
      variant = 'normal',
      heading,
      __scopePopover = 'Popover',
      ...props
    }: PolymorphicPropsInternal<ScopedProps<PopoverContentProps, 'Popover'>, T>,
    ref: ForwardedRef<T>,
  ) => {
    const headingId = useId();
    const descriptionId = useId();
    const { contentId, open, onOpenChange } = usePopoverContext(
      POPOVER_CONTENT_NAME,
      __scopePopover,
    );

    const scopes = usePopoverScope(__scopePopover);

    return (
      <AnimationPresence present={open || forceMount}>
        <PopperContent
          {...scopes}
          data-status={open ? 'open' : 'close'}
          position={position}
          offset={offset}
          disablePortal={disablePortal}
          container={container}
          referenceHidden={referenceHidden}
          referenceHiddenOffsets={referenceHiddenOffsets}
          setContext={setContext}
          wrapperProps={wrapperProps}
        >
          <FocusScope
            loop={loop}
            trapped={trapped}
            trappedContent={trappedContent}
            onMountAutoFocus={onMountAutoFocus}
            onUnmountAutoFocus={onUnmountAutoFocus}
          >
            <DismissableLayer
              asChild
              disableOutsidePointerEvents={disableOutsidePointerEvents}
              onInteractOutside={onInteractOutside}
              onFocusOutside={onFocusOutside}
              onPointerDownOutside={onPointerDownOutside}
              onDismiss={() => {
                onOpenChange(false);
                onDismiss?.();
              }}
            >
              <FlexBox
                role="dialog"
                id={contentId}
                aria-modal={disableOutsidePointerEvents || trapped}
                aria-describedby={
                  variant !== 'custom' ? descriptionId : undefined
                }
                aria-labelledby={
                  variant !== 'custom' && heading ? headingId : undefined
                }
                ref={ref}
                as={as}
                gap="4px"
                {...props}
                sx={[popoverStyle, props.sx]}
              >
                {variant === 'custom' ? (
                  children
                ) : (
                  <>
                    <FlexBox
                      flexDirection="column"
                      data-role="popover-content-wrapper"
                      sx={{ paddingInline: '4px' }}
                      gap="10px"
                      flex="1"
                    >
                      <FlexBox
                        flexDirection="column"
                        data-role="popover-content-heading-wrapper"
                        gap="6px"
                      >
                        {heading && (
                          <Typography
                            id={headingId}
                            variant="headline2"
                            weight="bold"
                            color="semantic.label.normal"
                            data-role="popover-content-heading"
                          >
                            {heading}
                          </Typography>
                        )}

                        <Typography
                          id={descriptionId}
                          variant="body2-reading"
                          weight="medium"
                          color="semantic.label.neutral"
                          data-role="popover-content-description"
                        >
                          {children}
                        </Typography>
                      </FlexBox>

                      {action && (
                        <TextButtonProvider assistive="semantic.label.alternative">
                          <FlexBox
                            data-role="popover-content-action"
                            flexShrink="0"
                            alignItems="center"
                            gap="16px"
                            sx={{ height: '20px' }}
                          >
                            {action}
                          </FlexBox>
                        </TextButtonProvider>
                      )}
                    </FlexBox>

                    {closeButton && (
                      <FlexBox
                        data-role="popover-content-close-button"
                        flexShrink="0"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ padding: '4px', height: 'fit-content' }}
                      >
                        <IconButton
                          size={16}
                          onClick={() => onOpenChange(false)}
                          aria-label="Close dialog"
                        >
                          <IconClose />
                        </IconButton>
                      </FlexBox>
                    )}
                  </>
                )}
              </FlexBox>
            </DismissableLayer>
          </FocusScope>
        </PopperContent>
      </AnimationPresence>
    );
  },
) as PolymorphicComponentInternal<PopoverContentProps, 'div'>;

PopoverTrigger.displayName = POPOVER_TRIGGER_NAME;

export { Popover, PopoverTrigger, PopoverContent };

export type { PopoverProps, PopoverTriggerProps, PopoverContentProps };
