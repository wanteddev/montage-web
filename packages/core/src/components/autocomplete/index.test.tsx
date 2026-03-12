import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import { FormControl, FormField, FormLabel, FormMessage } from '../form';

import {
  Autocomplete,
  AutocompleteField,
  AutocompleteGroup,
  AutocompleteList,
  AutocompleteOption,
} from '.';

vi.mock('../animation-presence', () => ({
  AnimationPresence: ({
    children,
    present,
  }: {
    children: React.ReactNode;
    present: boolean;
  }) => (present ? children : null),
}));

describe('when given autocomplete component', () => {
  beforeEach(() => {
    render(
      <Autocomplete>
        <AutocompleteField>
          <input data-testid="autocomplete-field" />
        </AutocompleteField>
        <AutocompleteList data-testid="autocomplete-list">
          <AutocompleteGroup title="Group 1" data-testid="autocomplete-group">
            <AutocompleteOption
              value="item-1"
              data-testid="autocomplete-option-1"
            >
              Item 1
            </AutocompleteOption>
            <AutocompleteOption
              value="item-2"
              data-testid="autocomplete-option-2"
            >
              Item 2
            </AutocompleteOption>
          </AutocompleteGroup>
        </AutocompleteList>
      </Autocomplete>,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should handle keyboard events', () => {
    fireEvent.click(screen.getByTestId('autocomplete-field'));

    expect(screen.getByTestId('autocomplete-option-1')).toBeInTheDocument();

    fireEvent.keyDown(screen.getByTestId('autocomplete-field'), {
      key: 'End',
    });

    fireEvent.keyDown(screen.getByTestId('autocomplete-field'), {
      key: 'Enter',
    });

    expect(screen.getByTestId('autocomplete-field')).toHaveValue('item-2');

    fireEvent.click(screen.getByTestId('autocomplete-field'));

    fireEvent.keyDown(screen.getByTestId('autocomplete-field'), {
      key: 'Home',
    });

    fireEvent.keyDown(screen.getByTestId('autocomplete-field'), {
      key: 'Enter',
    });

    expect(screen.getByTestId('autocomplete-field')).toHaveValue('item-1');

    fireEvent.click(screen.getByTestId('autocomplete-field'));

    fireEvent.keyDown(screen.getByTestId('autocomplete-field'), {
      key: 'ArrowDown',
    });
    fireEvent.keyDown(screen.getByTestId('autocomplete-field'), {
      key: 'ArrowDown',
    });

    fireEvent.keyDown(screen.getByTestId('autocomplete-field'), {
      key: 'Enter',
    });

    expect(screen.getByTestId('autocomplete-field')).toHaveValue('item-2');
  });
});

describe('when given autocomplete component with form field', () => {
  beforeEach(() => {
    render(
      <FormField>
        <FormLabel>Label</FormLabel>
        <Autocomplete>
          <FormControl>
            <AutocompleteField>
              <input data-testid="autocomplete-field" />
            </AutocompleteField>
          </FormControl>
          <AutocompleteList data-testid="autocomplete-list">
            <AutocompleteGroup title="Group 1" data-testid="autocomplete-group">
              <AutocompleteOption
                value="item-1"
                data-testid="autocomplete-option-1"
              >
                Item 1
              </AutocompleteOption>
            </AutocompleteGroup>
          </AutocompleteList>
        </Autocomplete>
        <FormMessage>Message</FormMessage>
      </FormField>,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should pass accessibility test', async () => {
    expect(
      await axe(screen.getByTestId('autocomplete-field')),
    ).toHaveNoViolations();

    fireEvent.click(screen.getByTestId('autocomplete-field'));

    expect(
      await axe(screen.getByTestId('autocomplete-list')),
    ).toHaveNoViolations();
    expect(
      await axe(screen.getByTestId('autocomplete-group')),
    ).toHaveNoViolations();
    expect(
      await axe(screen.getByTestId('autocomplete-option-1')),
    ).toHaveNoViolations();
  });
});
