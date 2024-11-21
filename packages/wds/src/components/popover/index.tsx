import { forwardRef, useId } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Slot } from '@radix-ui/react-slot';
import { composeEventHandlers } from '@radix-ui/primitive';

import DismissableLayer from '../dismissable-layer';
import { Popper, PopperAnchor, PopperArrow, PopperContent } from '../popper';
import FlexBox from '../flex-box';
import FocusScope from '../focus-scope';

import { PopoverProvider, usePopoverContext } from './contexts';
import {
  POPOVER_CONTENT_NAME,
  POPOVER_NAME,
  POPOVER_TRIGGER_NAME,
} from './constants';
import { popoverStyle } from './style';

import type { PopoverContentProps, PopoverProps } from './types';
import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

const Popover = ({
  open: originOpen,
  defaultOpen,
  onOpenChange,
  children,
}: PropsWithChildren<PopoverProps>) => {
  const triggerId = useId();
  const contentId = useId();

  const [open = false, setOpen] = useControllableState({
    prop: originOpen,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <PopoverProvider
      triggerId={triggerId}
      contentId={contentId}
      open={open}
      onOpenChange={setOpen}
    >
      <Popper>{children}</Popper>
    </PopoverProvider>
  );
};

Popover.displayName = POPOVER_NAME;

const PopoverTrigger = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<typeof Slot>
>((props, ref) => {
  const { contentId, triggerId, open, onOpenChange } =
    usePopoverContext(POPOVER_TRIGGER_NAME);

  return (
    <PopperAnchor>
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
});

PopoverTrigger.displayName = POPOVER_TRIGGER_NAME;

const PopoverContent = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<PopoverContentProps, 'div'>
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
      ...props
    },
    ref,
  ) => {
    const { contentId, open, onOpenChange } =
      usePopoverContext(POPOVER_CONTENT_NAME);

    return open ? (
      <PopperContent
        position={position}
        offset={offset}
        disablePortal={disablePortal}
        container={container}
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

              {arrow && <PopperArrow />}
            </FlexBox>
          </DismissableLayer>
        </FocusScope>
      </PopperContent>
    ) : null;
  },
);

PopoverTrigger.displayName = POPOVER_TRIGGER_NAME;

export { Popover, PopoverTrigger, PopoverContent };
