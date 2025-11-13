import { useEffect, useRef, useState } from 'react';
import copy from 'copy-to-clipboard';
import { useToast } from '@wanteddev/wds';

import { rgbaToHex } from './helpers';

export const useHexColor = (color: string) => {
  const [hex, setHex] = useState(color);

  useEffect(() => {
    const getHexValue = () => {
      const style = getComputedStyle(document.documentElement);

      if (color.startsWith('var(')) {
        let hexColor = getComputedStyle(document.documentElement)
          .getPropertyValue(color.replace(/^var\(/, '').replace(/\)$/, ''))
          .trim();

        if (/^#[a-fA-F0-9]{3}$/.test(hexColor)) {
          hexColor =
            '#' +
            hexColor
              .slice(1)
              .split('')
              .map((c) => c + c)
              .join('');
        }

        return hexColor.startsWith('#')
          ? hexColor.toUpperCase()
          : rgbaToHex(hexColor).toUpperCase();
      } else if (color.startsWith('rgba(var(')) {
        const [variable, opacity = '1'] = color
          .replace(/^rgba\(var\(/, '')
          .replace(')', '')
          .replace(/\)$/, '')
          .split(', ');

        const rgb = style.getPropertyValue(variable!);

        const a = opacity.startsWith('var(')
          ? style.getPropertyValue(opacity.replace('var(', '').replace(')', ''))
          : opacity;

        return rgbaToHex(`rgba(${rgb}, ${a})`).toUpperCase();
      }

      return color.startsWith('#')
        ? color.toUpperCase()
        : rgbaToHex(color).toUpperCase();
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHex(getHexValue());
  }, [color]);

  return {
    hex,
  };
};

export const useElementPosition = () => {
  const ref = useRef<HTMLButtonElement>(null);

  const [position, setPosition] = useState({ x: '0px', y: '0px' });
  const [border, setBorder] = useState({ left: '0px', right: '0px' });

  useEffect(() => {
    const updatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const parent = ref.current.closest('[data-role="palette-wrapper"]');

        if (parent) {
          const parentRect = parent.getBoundingClientRect();

          setPosition({
            x: `${rect.left - parentRect.left}px`,
            y: `${rect.top - parentRect.top}px`,
          });

          const borderLeft = rect.left - parentRect.left === 0;
          const borderRight =
            rect.right - parentRect.right === 0 ||
            parent.lastElementChild?.contains(ref.current) ||
            parent.lastElementChild?.isEqualNode(ref.current);

          setBorder({
            left: borderLeft ? '1px' : '0px',
            right: borderRight ? '1px' : '0px',
          });
        }
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  return {
    position,
    border,
    ref,
  };
};

export const useCopyToClipboard = () => {
  const toast = useToast();

  const handleCopy = (hex: string) => {
    const success = copy(hex);

    if (success) {
      toast({
        variant: 'positive',
        content: '클립보드에 복사 했습니다.',
      });
    }
  };

  return {
    handleCopy,
  };
};
