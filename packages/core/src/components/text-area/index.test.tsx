import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { axe } from 'vitest-axe';

import {
  FormControl,
  FormControlField,
  FormControlLabel,
  FormControlMessage,
} from '../form-control';
import { Button } from '../button';
import { ContentBadge } from '../content-badge';
import { IconButton } from '../icon-button';
import { SegmentedControl, SegmentedControlItem } from '../segmented-control';
import { TextButton } from '../text-button';

import { TextArea, TextAreaContent } from '.';

import type { ReactElement } from 'react';

describe('when given text area component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should pass accessibility test with form control', async () => {
    render(
      <FormControl>
        <FormControlLabel>Label</FormControlLabel>
        <FormControlField>
          <TextArea data-testid="text-area" />
        </FormControlField>
        <FormControlMessage>Message</FormControlMessage>
      </FormControl>,
    );

    expect(await axe(screen.getByTestId('text-area'))).toHaveNoViolations();
  });

  it('should sync height on input in uncontrolled mode', () => {
    render(<TextArea data-testid="text-area" defaultValue="one line" />);

    const textArea = screen.getByTestId('text-area');
    const wrapper = textArea.closest(
      '[data-component="text-area"]',
    ) as HTMLElement;

    // 마운트 시 렌더 effect가 이미 설정한 값을 지워, 리렌더 없는 입력만으로
    // 높이 동기화가 다시 일어나는지 관찰한다
    wrapper.style.removeProperty('--text-area-scroll-height');

    fireEvent.change(textArea, { target: { value: 'one\ntwo\nthree' } });

    expect(
      wrapper.style.getPropertyValue('--text-area-scroll-height'),
    ).not.toBe('');
  });
});

describe('when given button inside text area primary icon button content', () => {
  afterEach(() => {
    cleanup();
  });

  const renderButton = (
    area: { size?: 'large' | 'medium' },
    button: { size?: 'xsmall' | 'small' | 'medium' | 'large' } = {},
  ) => {
    render(
      <TextArea
        {...area}
        trailingContent={
          <TextAreaContent variant="primary-icon-button">
            <Button aria-label="Send" {...button}>
              Send
            </Button>
          </TextAreaContent>
        }
      />,
    );

    return window.getComputedStyle(screen.getByLabelText('Send')).minHeight;
  };

  it.each([
    ['large', 'var(--dimension-32)'],
    ['medium', 'var(--dimension-28)'],
  ] as const)('should size the button by the %s text area', (size, height) => {
    expect(renderButton({ size })).toBe(height);
  });

  it('should keep the size declared on the button', () => {
    expect(renderButton({ size: 'medium' }, { size: 'small' })).toBe(
      'var(--dimension-32)',
    );
  });
});

describe('when given text area inside form control', () => {
  afterEach(() => {
    cleanup();
  });

  it('should size the primary button by the form control size', () => {
    render(
      <FormControl size="medium">
        <TextArea
          trailingContent={
            <TextAreaContent variant="primary-icon-button">
              <Button aria-label="Send">Send</Button>
            </TextAreaContent>
          }
        />
      </FormControl>,
    );

    expect(
      window.getComputedStyle(screen.getByLabelText('Send')).minHeight,
    ).toBe('var(--dimension-28)');
  });
});

describe('when given components inside text area fixed size content', () => {
  afterEach(() => {
    cleanup();
  });

  // Emotion class names are derived from the generated styles, so equal class
  // names mean the slot default renders exactly like an explicit `size`.
  const classNamesOf = (element: ReactElement) => {
    const { container, unmount } = render(element);
    const classNames = Array.from(
      container.querySelectorAll(
        '[data-testid="child"], [data-testid="child"] *',
      ),
    ).map((node) => node.getAttribute('class') ?? '');
    unmount();
    return classNames;
  };

  it.each([
    [
      'content-badge',
      (size?: 'small' | 'medium') => (
        <ContentBadge data-testid="child" size={size}>
          Badge
        </ContentBadge>
      ),
    ],
    [
      'button',
      (size?: 'small' | 'medium') => (
        <TextButton data-testid="child" size={size}>
          Text
        </TextButton>
      ),
    ],
    [
      'segmented-control',
      (size?: 'small' | 'medium') => (
        <SegmentedControl data-testid="child" size={size} defaultValue="1">
          <SegmentedControlItem value="1">One</SegmentedControlItem>
        </SegmentedControl>
      ),
    ],
  ] as const)('should apply the small size in %s content', (variant, child) => {
    const area = (element: ReactElement) => (
      <TextArea
        size="medium"
        trailingContent={
          <TextAreaContent variant={variant}>{element}</TextAreaContent>
        }
      />
    );

    expect(classNamesOf(area(child()))).toEqual(
      classNamesOf(area(child('small'))),
    );
    expect(classNamesOf(area(child()))).not.toEqual(
      classNamesOf(area(child('medium'))),
    );
  });
});

describe('when given icon buttons inside text area content', () => {
  afterEach(() => {
    cleanup();
  });

  const widthOf = (label: string) =>
    window.getComputedStyle(screen.getByLabelText(label)).width;

  it('should size normal icon buttons by the field and solid ones to small', () => {
    render(
      <FormControl size="medium">
        <TextArea
          leadingContent={
            <TextAreaContent variant="icon-button">
              <IconButton aria-label="Leading">
                <svg />
              </IconButton>
            </TextAreaContent>
          }
          trailingContent={
            <TextAreaContent variant="icon-button">
              <IconButton variant="solid" aria-label="Send">
                <svg />
              </IconButton>
            </TextAreaContent>
          }
        />
      </FormControl>,
    );

    expect(widthOf('Leading')).toBe('18px');
    expect(widthOf('Send')).toBe('var(--dimension-32)');
  });
});

describe('when given icon button inside text area icon content', () => {
  afterEach(() => {
    cleanup();
  });

  it('should apply the same defaults as icon-button content', () => {
    render(
      <TextArea
        size="medium"
        leadingContent={
          <TextAreaContent variant="icon">
            <IconButton aria-label="Leading">
              <svg />
            </IconButton>
          </TextAreaContent>
        }
      />,
    );

    expect(
      window.getComputedStyle(screen.getByLabelText('Leading')).width,
    ).toBe('18px');
  });
});

describe('when given icon button content in a large text area', () => {
  afterEach(() => {
    cleanup();
  });

  // The alignment wrapper is 24 wide: the 20px icon button plus 2px on each side.
  it('should render a 24px wide wrapper', () => {
    const { container } = render(
      <TextArea
        size="large"
        leadingContent={
          <TextAreaContent variant="icon-button">
            <IconButton aria-label="Leading">
              <svg />
            </IconButton>
          </TextAreaContent>
        }
      />,
    );

    expect(
      window
        .getComputedStyle(
          container.querySelector('[data-component="text-area"]')!,
        )
        .getPropertyValue('--text-area-content-icon-wrapper-width'),
    ).toBe('var(--dimension-24)');
  });
});

describe('when the text area is server rendered', () => {
  // Before the client measures it, the height must follow the size's
  // line-height instead of a fixed pixel value, or it jumps after hydration.
  it('should size the initial height from the line-height variable', () => {
    const html = renderToString(<TextArea minRows={3} />);

    expect(html).toContain(
      '--text-area-height:calc(3 * var(--text-area-line-height))',
    );
    expect(html).not.toMatch(/--text-area-height:\d+px/);
  });
});
