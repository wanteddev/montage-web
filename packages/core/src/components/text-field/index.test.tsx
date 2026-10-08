import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { axe } from 'vitest-axe';

import {
  FormControl,
  FormControlField,
  FormControlLabel,
  FormControlMessage,
} from '../form-control';
import { ContentBadge } from '../content-badge';
import { IconButton } from '../icon-button';
import { useInheritedSize } from '../../hooks/internal/use-slot-defaults';

import { TextField, TextFieldContent } from '.';

describe('when given text field component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should focus input when wrapper is clicked', async () => {
    const { container } = render(<TextField data-testid="text-field" />);

    const wrapper = container.querySelector<HTMLElement>(
      '[data-component="text-field"]',
    )!;

    fireEvent.click(wrapper);

    await waitFor(() => {
      expect(screen.getByTestId('text-field')).toHaveFocus();
    });
  });

  it('should pass accessibility test with form control', async () => {
    render(
      <FormControl>
        <FormControlLabel>Label</FormControlLabel>
        <FormControlField>
          <TextField
            data-testid="text-field"
            readOnly={false}
            status="normal"
          />
        </FormControlField>
        <FormControlMessage>Message</FormControlMessage>
      </FormControl>,
    );

    expect(await axe(screen.getByTestId('text-field'))).toHaveNoViolations();
  });
});

describe('when given content badge inside text field content', () => {
  afterEach(() => {
    cleanup();
  });

  const renderBadge = (
    field: { size?: 'large' | 'medium' },
    badge: { size?: 'xsmall' | 'small' | 'medium' } = {},
  ) => {
    render(
      <TextField
        {...field}
        trailingContent={
          <TextFieldContent variant="badge">
            <ContentBadge data-testid="badge" {...badge}>
              Badge
            </ContentBadge>
          </TextFieldContent>
        }
      />,
    );

    return window.getComputedStyle(screen.getByTestId('badge')).paddingTop;
  };

  it.each([
    ['large', '4px'],
    ['medium', '3px'],
  ] as const)('should size the badge by the %s text field', (size, padding) => {
    expect(renderBadge({ size })).toBe(padding);
  });

  it('should size the badge by the form control size', () => {
    render(
      <FormControl size="medium">
        <TextField
          trailingContent={
            <TextFieldContent variant="badge">
              <ContentBadge data-testid="badge">Badge</ContentBadge>
            </TextFieldContent>
          }
        />
      </FormControl>,
    );

    expect(
      window.getComputedStyle(screen.getByTestId('badge')).paddingTop,
    ).toBe('3px');
  });

  it('should keep the size declared on the badge', () => {
    expect(renderBadge({ size: 'large' }, { size: 'medium' })).toBe('5px');
  });
});

describe('when given responsive sizes to text field content badge', () => {
  afterEach(() => {
    cleanup();
  });

  // jsdom does not evaluate media queries, so the inherited sizes are read
  // through the same hook ContentBadge uses.
  const BadgeSizeProbe = () => (
    <span data-testid="probe">
      {JSON.stringify(useInheritedSize('ContentBadge', undefined, {}))}
    </span>
  );

  it('should inherit form control per-breakpoint sizes', () => {
    render(
      <FormControl size="large" md={{ size: 'medium' }}>
        <TextField
          trailingContent={
            <TextFieldContent variant="badge">
              <BadgeSizeProbe />
            </TextFieldContent>
          }
        />
      </FormControl>,
    );

    expect(JSON.parse(screen.getByTestId('probe').textContent!)).toEqual({
      size: 'small',
      responsive: { md: { size: 'xsmall' } },
    });
  });

  it('should keep the default size in a non-badge content', () => {
    render(
      <TextField
        size="large"
        trailingContent={
          <TextFieldContent variant="custom">
            <ContentBadge data-testid="badge">Badge</ContentBadge>
          </TextFieldContent>
        }
      />,
    );

    expect(
      window.getComputedStyle(screen.getByTestId('badge')).paddingTop,
    ).toBe('3px');
  });
});

describe('when given icon buttons inside text field content', () => {
  afterEach(() => {
    cleanup();
  });

  const widthOf = (label: string) =>
    window.getComputedStyle(screen.getByLabelText(label)).width;

  // interactionOverflow: the layout is the icon (large 20, medium 18).
  it.each([
    ['large', '20px'],
    ['medium', '18px'],
  ] as const)(
    'should size icon buttons by the %s text field with interactionOverflow',
    (size, width) => {
      render(
        <TextField
          size={size}
          leadingContent={
            <TextFieldContent variant="icon-button">
              <IconButton aria-label="Leading">
                <svg />
              </IconButton>
            </TextFieldContent>
          }
        />,
      );

      expect(widthOf('Leading')).toBe(width);
    },
  );

  it('should size the reset button by the form control size', () => {
    const { container } = render(
      <FormControl size="medium">
        <TextField />
      </FormControl>,
    );

    expect(
      window.getComputedStyle(
        container.querySelector(
          '[data-role="text-field-reset"] [data-component="icon-button"]',
        )!,
      ).width,
    ).toBe('18px');
  });

  it('should keep the size declared on the icon button', () => {
    render(
      <TextField
        leadingContent={
          <TextFieldContent variant="icon-button">
            <IconButton
              size="small"
              interactionOverflow={false}
              aria-label="Leading"
            >
              <svg />
            </IconButton>
          </TextFieldContent>
        }
      />,
    );

    expect(widthOf('Leading')).toBe('var(--dimension-24)');
  });
});

describe('when given a theme color token to an icon text field content', () => {
  it('should resolve the token instead of emitting it as a CSS value', () => {
    render(
      <TextFieldContent
        variant="icon"
        color="semantic.foreground.brand.primary"
      >
        <svg />
      </TextFieldContent>,
    );

    const css = Array.from(document.querySelectorAll('style'))
      .map((style) => style.textContent)
      .join('');

    expect(css).not.toMatch(/color:\s*semantic\./);
  });
});
