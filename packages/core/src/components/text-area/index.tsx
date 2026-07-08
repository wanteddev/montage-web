import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { Box } from '@montage-ui/engine';
import { composeEventHandlers } from '@radix-ui/primitive';

import { FlexBox } from '../flex-box';
import { ScrollArea } from '../scroll-area';
import useResizeObserver from '../../hooks/internal/use-resize-observer';
import { IconButtonProvider } from '../icon-button/contexts';
import { useFormControlLayoutContext } from '../form-control/contexts';
import { mergeResponsiveProps } from '../../utils/internal/responsive-props';

import { getTextAreaDefaultHeight } from './helpers';
import {
  textAreaBottomAreaStyle,
  textAreaContentStyle,
  textAreaStyle,
  textAreaWrapperStyle,
} from './style';

import type { DefaultComponentPropsInternal } from '@montage-ui/engine';
import type { TextAreaContentProps, TextAreaProps } from './types';

const TextArea = forwardRef<
  HTMLTextAreaElement,
  DefaultComponentPropsInternal<TextAreaProps, 'textarea'>
>(
  (
    {
      leadingContent,
      trailingContent,
      value,
      invalid,
      disabled = false,
      maxRows,
      minRows = 2,
      className,
      style,
      size,
      sx,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    const { size: formControlSize, responsive } =
      useFormControlLayoutContext() || {};

    const resolvedSize = size ?? formControlSize ?? 'large';

    const {
      xs: resolvedXs,
      sm: resolvedSm,
      md: resolvedMd,
      lg: resolvedLg,
      xl: resolvedXl,
    } = mergeResponsiveProps({ xs, sm, md, lg, xl }, responsive, 'size');

    const parentRef = useRef<HTMLDivElement>(null);

    const [node, setNode] = useState<HTMLTextAreaElement | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const composedRefs = useComposedRefs<HTMLTextAreaElement>(
      textAreaRef,
      ref,
      setNode,
    );

    const shadowRef = useRef<HTMLTextAreaElement>(null);

    const syncTextAreaHeight = useCallback(() => {
      if (!textAreaRef.current || !shadowRef.current || !parentRef.current) {
        return;
      }

      const textArea = textAreaRef.current;
      const shadow = shadowRef.current;
      const parent = parentRef.current;

      const container = textArea.ownerDocument.defaultView || window;
      const computedStyle = container.getComputedStyle(textArea);

      if (computedStyle.width === '0px') {
        return;
      }

      shadow.style.width = computedStyle.width;
      shadow.style.font = computedStyle.font;
      shadow.style.letterSpacing = computedStyle.letterSpacing;
      shadow.style.wordSpacing = computedStyle.wordSpacing;
      shadow.style.whiteSpace = computedStyle.whiteSpace;
      shadow.style.boxSizing = computedStyle.boxSizing;
      shadow.style.padding = computedStyle.padding;
      shadow.style.border = computedStyle.border;

      shadow.value = textArea.value || props.placeholder || 'x';

      if (shadow.value.slice(-1) === '\n') {
        shadow.value += ' ';
      }

      const innerHeight = shadow.scrollHeight;

      shadow.value = 'x';
      const singleRow = shadow.scrollHeight;
      shadow.value = 'x\nx';
      const doubleRow = shadow.scrollHeight;

      const singleRowHeight = doubleRow - singleRow;

      let outerHeight = innerHeight;

      if (minRows) {
        outerHeight = Math.max(
          Number(minRows) * singleRowHeight + singleRow - singleRowHeight,
          outerHeight,
        );

        parent.style.setProperty('--text-area-height', outerHeight + 'px');
      }

      outerHeight = maxRows
        ? Math.max(
            Math.min(
              Number(maxRows) * singleRowHeight + singleRow - singleRowHeight,
              outerHeight,
            ),
            singleRowHeight + singleRow - singleRowHeight,
          )
        : outerHeight;

      parent.style.setProperty('--text-area-scroll-height', `${outerHeight}px`);
    }, [maxRows, minRows, props.placeholder]);

    useResizeObserver(textAreaRef.current, syncTextAreaHeight);

    useEffect(() => {
      syncTextAreaHeight();
    });

    useEffect(() => {
      const form = node?.closest('form');

      if (form) {
        const reset = () => {
          requestAnimationFrame(() => {
            syncTextAreaHeight();
          });
        };
        form.addEventListener('reset', reset);
        return () => form.removeEventListener('reset', reset);
      }
    }, [node, syncTextAreaHeight]);

    useEffect(() => {
      const container = parentRef.current;

      if (!container || disabled) return;

      const handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (target.closest('input, textarea, button, a, [contenteditable]'))
          return;

        textAreaRef.current?.click();
        textAreaRef.current?.focus();
      };

      container.addEventListener('click', handleClick);

      return () => container.removeEventListener('click', handleClick);
    }, [disabled]);

    return (
      <FlexBox
        ref={parentRef}
        flexDirection="column"
        data-component="text-area"
        className={className}
        style={{
          ...getTextAreaDefaultHeight({ minRows }),
          ...style,
        }}
        gap="12px"
        sx={[
          textAreaWrapperStyle({
            invalid: invalid,
            disabled,
            size: resolvedSize,
            xs: resolvedXs,
            sm: resolvedSm,
            md: resolvedMd,
            lg: resolvedLg,
            xl: resolvedXl,
            ...props,
          }),
          sx,
        ]}
      >
        <ScrollArea>
          <Box
            as="textarea"
            ref={composedRefs}
            {...props}
            disabled={disabled}
            sx={textAreaStyle({
              size: resolvedSize,
              xs: resolvedXs,
              sm: resolvedSm,
              md: resolvedMd,
              lg: resolvedLg,
              xl: resolvedXl,
              ...props,
            })}
            aria-invalid={invalid}
            value={value}
            onChange={composeEventHandlers(props.onChange, () => {
              syncTextAreaHeight();
            })}
          />
          <Box
            as="textarea"
            aria-hidden
            readOnly
            ref={shadowRef}
            tabIndex={-1}
            style={{
              visibility: 'hidden',
              position: 'absolute',
              overflow: 'hidden',
              height: 0,
              top: 0,
              left: 0,
              transform: 'translateZ(0)',
              paddingTop: 0,
            }}
          />
        </ScrollArea>

        {(Boolean(leadingContent) || Boolean(trailingContent)) && (
          <FlexBox
            data-role="text-area-bottom-area"
            sx={textAreaBottomAreaStyle}
            alignItems="flex-end"
            justifyContent="flex-end"
          >
            <FlexBox
              alignItems="center"
              data-role="text-area-bottom-area-leading-content"
              flex="1 0 0"
            >
              {leadingContent}
            </FlexBox>

            <FlexBox
              alignItems="center"
              justifyContent="flex-end"
              data-role="text-area-bottom-area-trailing-content"
            >
              {trailingContent}
            </FlexBox>
          </FlexBox>
        )}
      </FlexBox>
    );
  },
);

TextArea.displayName = 'TextArea';

const TextAreaContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<TextAreaContentProps, 'div'>
>(({ variant = 'icon-button', children, sx, ...props }, ref) => {
  switch (variant) {
    case 'content-badge':
      return (
        <FlexBox
          data-component="text-area-content"
          ref={ref}
          sx={[textAreaContentStyle, sx]}
          {...props}
        >
          {children}
        </FlexBox>
      );
    case 'button':
      return (
        <FlexBox
          data-component="text-area-content"
          ref={ref}
          alignItems="center"
          gap="var(--text-area-content-button-gap)"
          sx={[textAreaContentStyle, sx]}
          {...props}
        >
          {children}
        </FlexBox>
      );
    case 'icon':
    case 'icon-button':
      return (
        <FlexBox
          data-component="text-area-content"
          ref={ref}
          justifyContent="center"
          alignItems="center"
          sx={[
            textAreaContentStyle,
            (theme) => ({
              fontSize: 'var(--text-area-content-icon-size)',
              height: 'var(--text-area-content-icon-wrapper-height)',
              width: 'var(--text-area-content-icon-wrapper-width)',
              padding: `${theme.spacing[0]} ${theme.spacing[2]}`,
              color: theme.semantic.label.alternative,
              ['[data-component="icon-button"]']: {
                flexShrink: 0,
              },
            }),
            sx,
          ]}
          {...props}
        >
          <IconButtonProvider normal="semantic.label.alternative">
            {children}
          </IconButtonProvider>
        </FlexBox>
      );
    case 'primary-icon-button':
      return (
        <FlexBox
          data-component="text-area-content"
          ref={ref}
          sx={[textAreaContentStyle, sx]}
          {...props}
        >
          {children}
        </FlexBox>
      );
    case 'segmented-control':
      return (
        <FlexBox
          data-component="text-area-content"
          ref={ref}
          sx={[
            textAreaContentStyle,
            {
              ['[data-component="segmented-control"]']: {
                width: '60px',
              },
              ['[data-component="segmented-control-item"]']: {
                alignItems: 'center',
                justifyContent: 'center',
                ['& > [data-role="segmented-control-item-text"]']: {
                  display: 'inline-flex',
                },
              },
            },
            sx,
          ]}
          {...props}
        >
          {children}
        </FlexBox>
      );
    case 'custom':
    default:
      return (
        <FlexBox
          data-component="text-area-content"
          ref={ref}
          sx={[textAreaContentStyle, sx]}
          {...props}
        >
          {children}
        </FlexBox>
      );
  }
});

TextAreaContent.displayName = 'TextAreaContent';

export { TextArea, TextAreaContent };

export type { TextAreaProps, TextAreaContentProps };
