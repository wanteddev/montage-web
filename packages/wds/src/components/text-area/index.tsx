import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { composeRefs, useComposedRefs } from '@radix-ui/react-compose-refs';
import { css } from '@emotion/react';
import { useSize } from '@radix-ui/react-use-size';

import FlexBox from '../flex-box';
import Typography from '../typography';
import ScrollArea from '../scroll-area';
import { typographyStyle } from '../../utils/typography';

import {
  maxLengthStyle,
  rightIconStyle,
  textAreaStyle,
  textAreaWrapperStyle,
} from './style';

import type { MergeElementProps } from '../../types';
import type { TextAreaProps } from './types';

const getStyleValue = (value: string) => {
  return parseInt(value, 10) || 0;
};
export interface Cancelable {
  clear(): void;
}

const debounce = <T extends (...args: Array<any>) => any>(
  func: T,
  wait = 166,
) => {
  let timeout: ReturnType<typeof setTimeout>;
  function debounced(...args: Parameters<T>) {
    const later = () => {
      // @ts-ignore
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced as T & Cancelable;
};

type Props = MergeElementProps<'textarea', TextAreaProps>;

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
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
      shadow.value = textArea.value || props.placeholder || 'x';

      if (shadow.value.slice(-1) === '\n') {
        shadow.value += ' ';
      }

      const boxSizing = computedStyle.boxSizing;
      const padding =
        getStyleValue(computedStyle.paddingBottom) +
        getStyleValue(computedStyle.paddingTop);

      const border =
        getStyleValue(computedStyle.borderBottomWidth) +
        getStyleValue(computedStyle.borderTopWidth);

      const innerHeight = shadow.scrollHeight;

      shadow.value = 'x';
      const singleRowHeight = shadow.scrollHeight;

      let outerHeight = innerHeight;

      if (minRows) {
        outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);

        parent.style.setProperty(
          '--wds-text-area-height',
          outerHeight +
            (boxSizing === 'border-box' ? padding + border : 0) +
            'px',
        );
      }

      outerHeight = maxRows
        ? Math.max(
            Math.min(Number(maxRows) * singleRowHeight, outerHeight),
            singleRowHeight,
          )
        : outerHeight;

      parent.style.setProperty(
        '--wds-text-area-scroll-height',
        outerHeight +
          (boxSizing === 'border-box' ? padding + border : 0) +
          'px',
      );
    }, [maxRows, minRows, props.placeholder]);

    useEffect(() => {
      if (!textAreaRef.current) {
        return;
      }
      const handleResize = () => {
        syncTextAreaHeight();
      };
      let rAF: any;
      const rAFHandleResize = () => {
        cancelAnimationFrame(rAF);
        rAF = requestAnimationFrame(() => {
          handleResize();
        });
      };
      const debounceHandleResize = debounce(handleResize);
      const textArea = textAreaRef.current;
      const containerWindow = textArea.ownerDocument.defaultView || window;
      containerWindow.addEventListener('resize', debounceHandleResize);
      let resizeObserver: ResizeObserver;
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(
          process.env.NODE_ENV === 'test' ? rAFHandleResize : handleResize,
        );
        resizeObserver.observe(textArea);
      }
      return () => {
        debounceHandleResize.clear();
        cancelAnimationFrame(rAF);
        containerWindow.removeEventListener('resize', debounceHandleResize);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
      };
    }, [syncTextAreaHeight]);

    useEffect(() => {
      syncTextAreaHeight();
      setLength(value?.length || 0);
    }, [syncTextAreaHeight, setLength, value]);

    return (
      <ScrollArea
        ref={parentRef}
        className={className}
        css={textAreaWrapperStyle({
          invalid: invalid || isInvalidLength,
          disabled,
          xs,
          sm,
          md,
          lg,
          xl,
          ...props,
        })}
      >
        <textarea
          css={textAreaStyle({
            xs,
            sm,
            md,
            lg,
            xl,
            ...props,
          })}
          ref={composedRefs}
          aria-invalid={invalid}
          value={value}
          {...props}
          style={{
            ...props.style,
            paddingRight: `calc(16px + ${
              rightIconWidth ? rightIconWidth + 8 : 0
            }px)`,
            paddingBottom: `calc(12px + ${
              Boolean(maxLength) ? '22px' : '0px'
            })`,
          }}
        >
          {value}
        </textarea>
        <textarea
          aria-hidden
          readOnly
          ref={shadowRef}
          tabIndex={-1}
          css={css`
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
            paddingRight: `${
              (rightIconWidth ? rightIconWidth + 24 : 16) - 1
            }px`,
            paddingLeft: '16px',
          }}
        />

        {Boolean(rightIcon) && (
          <FlexBox
            wds-component="text-area-right-icon"
            alignItems="center"
            ref={composeRefs<HTMLDivElement>((node) => setRightIconRef(node))}
            css={rightIconStyle}
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
            css={maxLengthStyle}
          >
            {length}&#47;
            {maxLength!.toLocaleString()}
          </Typography>
        )}
      </ScrollArea>
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
