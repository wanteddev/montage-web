import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import {
  FormControl,
  FormControlField,
  FormControlLabel,
  FormControlMessage,
} from '../form-control';

import { TimePicker } from '.';

Object.defineProperty(window.Element.prototype, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

/**
 * 로케일의 오전/오후 표기는 런타임 ICU 버전에 따라 달라진다.
 * (ko-KR 기준 ICU 77은 "오전", ICU 78은 "AM"을 반환한다.)
 * 기대값을 하드코딩하면 Node 버전에 따라 테스트가 깨지므로,
 * 컴포넌트가 쓰는 것과 같은 경로로 기대값을 만든다.
 */
const meridiemOf = (locale: string, hour: number) =>
  new Intl.DateTimeFormat(locale, { hour: 'numeric', hour12: true })
    .formatToParts(new Date(2025, 0, 1, hour, 30))
    .find((part) => part.type === 'dayPeriod')
    ?.value.toUpperCase();

describe('when given time picker component', () => {
  const defaultProps = {
    defaultValue: new Date('2025-01-01T10:30:00'),
    onChange: vi.fn(),
    locale: 'en-US',
    format: 'HH:mm:ss',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should navigate between time lists with arrow keys', async () => {
    render(<TimePicker {...defaultProps} data-testid="time-picker" />);

    const input = screen.getByTestId<HTMLInputElement>('time-picker');

    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(input).toHaveValue('09:30:00');

    fireEvent.keyDown(input, { key: 'ArrowUp' });

    expect(input).toHaveValue('10:30:00');

    fireEvent.keyDown(input, { key: 'End' });

    expect(input).toHaveValue('23:30:00');

    fireEvent.keyDown(input, { key: 'Home' });

    expect(input).toHaveValue('00:30:00');

    fireEvent.keyDown(input, { key: 'ArrowRight' });

    await waitFor(() => {
      expect(input.selectionStart).toBe(3);
      expect(input.selectionEnd).toBe(5);
    });

    fireEvent.keyDown(input, { key: 'ArrowLeft' });

    await waitFor(() => {
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(2);
    });
  });

  it('should pass accessibility tests', async () => {
    render(<TimePicker {...defaultProps} data-testid="time-picker" />);

    expect(await axe(screen.getByTestId('time-picker'))).toHaveNoViolations();
  });

  it('should pass accessibility test with form control', async () => {
    render(
      <FormControl>
        <FormControlLabel>Label</FormControlLabel>
        <FormControlField>
          <TimePicker {...defaultProps} data-testid="time-picker" />
        </FormControlField>
        <FormControlMessage>Message</FormControlMessage>
      </FormControl>,
    );

    expect(await axe(screen.getByTestId('time-picker'))).toHaveNoViolations();
  });

  it('should render with custom format', () => {
    render(
      <TimePicker
        {...defaultProps}
        format="A hh:mm:ss"
        data-testid="time-picker"
      />,
    );

    expect(screen.getByTestId('time-picker')).toBeInTheDocument();
    expect(screen.getByTestId('time-picker')).toHaveValue('AM 10:30:00');
  });

  it('should render with custom locale', () => {
    render(
      <TimePicker
        {...defaultProps}
        format="A hh:mm:ss"
        locale="ko-KR"
        data-testid="time-picker"
      />,
    );

    expect(screen.getByTestId('time-picker')).toBeInTheDocument();
    expect(screen.getByTestId('time-picker')).toHaveValue(
      `${meridiemOf('ko-KR', 10)} 10:30:00`,
    );
  });

  it('should render with custom timezone', () => {
    render(
      <TimePicker
        {...defaultProps}
        defaultValue={new Date('2025-01-01 10:30:00 GMT+0900')}
        format="A hh:mm:ss"
        locale="ko-KR"
        timezone="UTC"
        data-testid="time-picker"
      />,
    );

    expect(screen.getByTestId('time-picker')).toBeInTheDocument();
    expect(screen.getByTestId('time-picker')).toHaveValue(
      `${meridiemOf('ko-KR', 1)} 01:30:00`,
    );
  });

  it('should render with 12-hour format', () => {
    render(
      <TimePicker {...defaultProps} format="hh:mm" data-testid="time-picker" />,
    );

    const input = screen.getByTestId<HTMLInputElement>('time-picker');

    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: 'End' });

    expect(input).toHaveValue('12:30');
  });

  it('should open time-view when clock icon is clicked', async () => {
    render(
      <TimePicker {...defaultProps} format="hh:mm" data-testid="time-picker" />,
    );

    fireEvent.click(screen.getByLabelText('Toggle time picker'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(document.activeElement).toHaveTextContent('10');
  });

  it('should handle paste events', () => {
    render(<TimePicker {...defaultProps} data-testid="time-picker" />);

    const input = screen.getByTestId<HTMLInputElement>('time-picker');
    fireEvent.focus(input);

    input.setSelectionRange(0, input.value.length);

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '14:30:00',
      },
    });

    expect(input).toHaveValue('14:30:00');

    input.setSelectionRange(0, input.value.length);

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '26:00:00',
      },
    });

    expect(input).toHaveValue('14:30:00');

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '23',
      },
    });

    expect(input).toHaveValue('14:30:23');

    input.setSelectionRange(0, input.value.length);

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '10:00:00',
      },
    });

    expect(input).toHaveValue('10:00:00');
  });
});
