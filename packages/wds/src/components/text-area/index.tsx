import { forwardRef, useCallback, useRef, useState } from 'react';
import { composeRefs, useComposedRefs } from '@radix-ui/react-compose-refs';
import { Box, css } from '@wanteddev/wds-engine';
import { useSize } from '@radix-ui/react-use-size';
import { composeEventHandlers } from '@radix-ui/primitive';

import FlexBox from '../flex-box';
import Typography from '../typography';
import ScrollArea from '../scroll-area';
import { typographyStyle } from '../../utils/typography';
import useResizeObserver from '../../hooks/use-resize-observer';

import {
  maxLengthStyle,
  rightIconStyle,
  textAreaStyle,
  textAreaWrapperStyle,
} from './style';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { TextAreaProps } from './types';

const TextArea = forwardRef<
  HTMLTextAreaElement,
  DefaultComponentProps<TextAreaProps, 'textarea'>
>(
  (
    {
      rightIcon,
      maxLength,
      value,
      invalid,
      disabled = false,
      maxRows,
      minRows = 1,
      className,
      htmlMaxLength,
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

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const composedRefs = useComposedRefs(textAreaRef, ref);

    const shadowRef = useRef<HTMLTextAreaElement>(null);

    const [rightIconRef, setRightIconRef] = useState<HTMLDivElement | null>(
      null,
    );
    const { width: rightIconWidth } = useSize(rightIconRef) || {
      width: 0,
    };

    const isInvalidLength = Boolean(maxLength) ? maxLength! < length : false;

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

      if (maxLength) {
        parent.style.paddingBottom = Boolean(maxLength)
          ? `calc(${computedStyle.paddingBottom} + var(--wds-text-area-max-length-padding-bottom))`
          : '0px';
      }

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
        outerHeight + 'px',
      );
    }, [maxRows, minRows, props.placeholder, maxLength]);

    useResizeObserver(textAreaRef.current, syncTextAreaHeight);

    return (
      <ScrollArea
        ref={parentRef}
        className={className}
        sx={[
          textAreaWrapperStyle({
            invalid: invalid || isInvalidLength,
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
        style={{
          paddingRight: rightIconWidth
            ? `calc(${rightIconWidth}px + var(--wds-text-area-additional-padding-right))`
            : 0,
          ...style,
        }}
      >
        <Box
          as="textarea"
          ref={composedRefs}
          {...props}
          disabled={disabled}
          maxLength={htmlMaxLength}
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
            syncTextAreaHeight();
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
            ${typographyStyle('body1_normal', 'regular')}
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

        {Boolean(rightIcon) && (
          <FlexBox
            wds-component="text-area-right-icon"
            alignItems="center"
            ref={composeRefs<HTMLDivElement>((node) => setRightIconRef(node))}
            sx={rightIconStyle}
          >
            {rightIcon}
          </FlexBox>
        )}

        {Boolean(maxLength) && (
          <Typography
            variant="caption1"
            weight="regular"
            color={
              isInvalidLength
                ? 'palette.status.negative'
                : 'palette.label.alternative'
            }
            sx={maxLengthStyle}
          >
            {length.toLocaleString()}&#47;
            {maxLength!.toLocaleString()}
          </Typography>
        )}
      </ScrollArea>
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
