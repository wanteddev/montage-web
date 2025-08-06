import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { Box, css } from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';
import { IconCircleExclamationFill } from '@wanteddev/wds-icon';

import { FlexBox } from '../flex-box';
import { Typography } from '../typography';
import { ScrollArea } from '../scroll-area';
import { typographyStyle } from '../../utils/typography';
import useResizeObserver from '../../hooks/internal/use-resize-observer';
import { IconButtonProvider } from '../icon-button/contexts';

import { getTextAreaDefaultHeight } from './helpers';
import {
  invalidIconWrapperStyle,
  textAreaBottomAreaStyle,
  textAreaCharacterCounterStyle,
  textAreaContentStyle,
  textAreaStyle,
  textAreaWrapperStyle,
} from './style';
import { TEXT_AREA_CONTENT_NAME, TEXT_AREA_NAME } from './constants';
import { TextAreaProvider, useTextAreaContext } from './contexts';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
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
    const [length, setLength] = useState(value?.length || 0);

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

        parent.style.setProperty('--wds-text-area-height', outerHeight + 'px');
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

      parent.style.setProperty(
        '--wds-text-area-scroll-height',
        `${outerHeight}px`,
      );
    }, [maxRows, minRows, props.placeholder]);

    useResizeObserver(textAreaRef.current, syncTextAreaHeight);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
      syncTextAreaHeight();
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      setLength(textAreaRef.current?.value?.length ?? 0);
    });

    useEffect(() => {
      const form = node?.closest('form');

      if (form) {
        const reset = () => {
          requestAnimationFrame(() => {
            syncTextAreaHeight();
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            setLength(textAreaRef.current?.value?.length ?? 0);
          });
        };
        form.addEventListener('reset', reset);
        return () => form.removeEventListener('reset', reset);
      }
    }, [node, syncTextAreaHeight, setLength]);

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
      <TextAreaProvider length={length}>
        <FlexBox
          ref={parentRef}
          flexDirection="column"
          wds-component="text-area"
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
              xs,
              sm,
              md,
              lg,
              xl,
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
                xs,
                sm,
                md,
                lg,
                xl,
                ...props,
              })}
              aria-invalid={invalid}
              value={value}
              onChange={composeEventHandlers(props.onChange, (e) => {
                if (value !== undefined) {
                  syncTextAreaHeight();
                }

                setLength(e.target.value.length || 0);
              })}
            />
            <Box
              as="textarea"
              aria-hidden
              readOnly
              ref={shadowRef}
              tabIndex={-1}
              sx={css`
                ${typographyStyle('body1-reading', 'regular')}
              `}
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

          {(invalid || Boolean(leadingContent) || Boolean(trailingContent)) && (
            <FlexBox
              data-role="text-area-bottom-area"
              sx={textAreaBottomAreaStyle}
              alignItems="center"
              justifyContent="space-between"
            >
              <FlexBox
                alignItems="center"
                data-role="text-area-bottom-area-leading-content"
              >
                {leadingContent}
              </FlexBox>

              <FlexBox
                alignItems="center"
                data-role="text-area-bottom-area-trailing-content"
              >
                {trailingContent ||
                  (invalid && (
                    <TextAreaContent
                      data-role="text-area-invalid"
                      sx={invalidIconWrapperStyle}
                      variant="icon"
                    >
                      <IconCircleExclamationFill />
                    </TextAreaContent>
                  ))}
              </FlexBox>
            </FlexBox>
          )}
        </FlexBox>
      </TextAreaProvider>
    );
  },
);

TextArea.displayName = TEXT_AREA_NAME;

const TextAreaContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<TextAreaContentProps, 'div'>
>(({ variant = 'characterCounter', children, sx, ...props }, ref) => {
  const { length } = useTextAreaContext(TEXT_AREA_CONTENT_NAME);

  switch (variant) {
    case 'characterCounter':
      return (
        <Typography
          as="div"
          wds-component="text-area-content"
          variant="label2"
          weight="medium"
          ref={ref}
          {...props}
          sx={[textAreaContentStyle, textAreaCharacterCounterStyle, sx]}
          color="semantic.label.alternative"
          data-is-overflow={
            !isNaN(Number(children)) && length > Number(children)
          }
        >
          <span data-role="text-area-content-character-counter-length">
            {length}
          </span>
          <span data-role="text-area-content-character-counter-divider">/</span>
          <span data-role="text-area-content-character-counter-max-length">
            {children}
          </span>
        </Typography>
      );
    case 'badge':
      return (
        <FlexBox
          wds-component="text-area-content"
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
          wds-component="text-area-content"
          ref={ref}
          alignItems="center"
          sx={[
            textAreaContentStyle,
            { maxHeight: '24px', padding: '0px 4px' },
            sx,
          ]}
          {...props}
        >
          {children}
        </FlexBox>
      );
    case 'icon':
      return (
        <FlexBox
          wds-component="text-area-content"
          ref={ref}
          sx={[
            textAreaContentStyle,
            (theme) => ({
              fontSize: '22px',
              padding: '1px',
              color: theme.semantic.label.assistive,
            }),
            sx,
          ]}
          {...props}
        >
          {children}
        </FlexBox>
      );
    case 'icon-button':
      return (
        <FlexBox
          wds-component="text-area-content"
          ref={ref}
          sx={[textAreaContentStyle, sx]}
          {...props}
        >
          <IconButtonProvider normal="semantic.label.alternative">
            {children}
          </IconButtonProvider>
        </FlexBox>
      );
    case 'custom':
    default:
      return (
        <FlexBox
          wds-component="text-area-content"
          ref={ref}
          sx={[textAreaContentStyle, sx]}
          {...props}
        >
          {children}
        </FlexBox>
      );
  }
});

TextAreaContent.displayName = TEXT_AREA_CONTENT_NAME;

export { TextArea, TextAreaContent };

export type { TextAreaProps, TextAreaContentProps };
