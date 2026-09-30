import { cleanup, render, screen } from '@testing-library/react';

import { FormControl } from '../form-control';
import { IconButton } from '../icon-button';
import { SelectMultiple } from '../select-multiple';

import { Option, Select, SelectContent } from '.';

const widthOf = (label: string) =>
  window.getComputedStyle(screen.getByLabelText(label)).width;

const leading = (
  <SelectContent variant="icon-button">
    <IconButton aria-label="Leading">
      <svg />
    </IconButton>
  </SelectContent>
);

describe('when given icon buttons inside select content', () => {
  afterEach(() => {
    cleanup();
  });

  // interactionOverflow: the layout is the icon (large 20, medium 18).
  it('should size icon buttons by the select size', () => {
    render(
      <Select size="medium" leadingContent={leading}>
        <Option value="1">Option 1</Option>
      </Select>,
    );

    expect(widthOf('Leading')).toBe('18px');
  });

  it('should follow the form control size', () => {
    render(
      <FormControl size="medium">
        <SelectMultiple leadingContent={leading}>
          <Option value="1">Option 1</Option>
        </SelectMultiple>
      </FormControl>,
    );

    expect(widthOf('Leading')).toBe('18px');
  });

  it('should keep the size declared on the icon button', () => {
    render(
      <Select
        leadingContent={
          <SelectContent variant="icon-button">
            <IconButton
              size="small"
              interactionOverflow={false}
              aria-label="Leading"
            >
              <svg />
            </IconButton>
          </SelectContent>
        }
      >
        <Option value="1">Option 1</Option>
      </Select>,
    );

    expect(widthOf('Leading')).toBe('var(--dimension-24)');
  });
});
