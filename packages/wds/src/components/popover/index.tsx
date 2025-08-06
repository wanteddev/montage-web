import { forwardRef, useId } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Slot } from '@radix-ui/react-slot';
import { composeEventHandlers } from '@radix-ui/primitive';
import { Box } from '@wanteddev/wds-engine';

import { DismissableLayer } from '../dismissable-layer';
import { Popper, PopperAnchor, PopperArrow, PopperContent } from '../popper';
import { FlexBox } from '../flex-box';
import { FocusScope } from '../focus-scope';
import { createScope } from '../../hooks/internal/use-scope-context';
import { AnimationPresence } from '../animation-presence';

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
            if (
              !open &&
              e.currentTarget.ariaDisabled?.toString() !== 'true' &&
              e.currentTarget.getAttribute('disabled')?.toString() !== 'true'
            ) {
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
      arrow,
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
      __scopePopover = 'Popover',
      ...props
    }: PolymorphicPropsInternal<ScopedProps<PopoverContentProps, 'Popover'>, T>,
    ref: ForwardedRef<T>,
  ) => {
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
              disableOutsidePointerEvents
              onDismiss={() => {
                onOpenChange(false);
              }}
            >
              <Box
                role="dialog"
                id={contentId}
                ref={ref}
                as={as ?? FlexBox}
                {...props}
                sx={[popoverStyle, props.sx]}
              >
                {children}

                {arrow && <PopperArrow {...scopes} />}
              </Box>
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
