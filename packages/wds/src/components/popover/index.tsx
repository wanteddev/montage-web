import { forwardRef, useId } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Slot } from '@radix-ui/react-slot';
import { composeEventHandlers } from '@radix-ui/primitive';

import DismissableLayer from '../dismissable-layer';
import { Popper, PopperAnchor, PopperArrow, PopperContent } from '../popper';
import FlexBox from '../flex-box';
import FocusScope from '../focus-scope';
import { createScope } from '../../hooks/use-scope-context';

import { PopoverProvider, usePopoverContext } from './contexts';
import {
  POPOVER_CONTENT_NAME,
  POPOVER_NAME,
  POPOVER_TRIGGER_NAME,
} from './constants';
import { popoverStyle } from './style';

import type { ScopedProps } from '../../hooks/use-scope-context';
import type { PopoverContentProps, PopoverProps } from './types';
import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

const usePopoverScope = createScope('Popper', 'PopperContent');

const Popover = ({
  open: originOpen,
  defaultOpen,
  onOpenChange,
  children,
  __scopePopover = 'Popover',
}: PropsWithChildren<ScopedProps<PopoverProps, 'Popover'>>) => {
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

const PopoverTrigger = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<typeof Slot>
>(
  (
    {
      __scopePopover = 'Popover',
      ...props
    }: ScopedProps<ComponentPropsWithoutRef<typeof Slot>, 'Popover'>,
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

const PopoverContent = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<ScopedProps<PopoverContentProps, 'Popover'>, 'div'>
>(
  (
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
      __scopePopover = 'Popover',
      ...props
    },
    ref,
  ) => {
    const { contentId, open, onOpenChange } = usePopoverContext(
      POPOVER_CONTENT_NAME,
      __scopePopover,
    );

    const scopes = usePopoverScope(__scopePopover);

    return open ? (
      <PopperContent
        {...scopes}
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
            <FlexBox
              role="dialog"
              id={contentId}
              ref={ref}
              {...props}
              sx={[popoverStyle, props.sx]}
            >
              {children}

              {arrow && <PopperArrow {...scopes} />}
            </FlexBox>
          </DismissableLayer>
        </FocusScope>
      </PopperContent>
    ) : null;
  },
);

PopoverTrigger.displayName = POPOVER_TRIGGER_NAME;

export { Popover, PopoverTrigger, PopoverContent };
