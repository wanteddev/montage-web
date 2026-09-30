import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import {
  FormControl,
  FormControlField,
  FormControlLabel,
  FormControlMessage,
} from '../form-control';
import { Button } from '../button';

import { TextArea, TextAreaContent } from '.';

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
