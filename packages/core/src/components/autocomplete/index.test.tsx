import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import {
  FormControl,
  FormControlField,
  FormControlLabel,
  FormControlMessage,
} from '../form-control';

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

describe('when given autocomplete component with form control', () => {
  beforeEach(() => {
    render(
      <FormControl>
        <FormControlLabel>Label</FormControlLabel>
        <Autocomplete>
          <FormControlField>
            <AutocompleteField>
              <input data-testid="autocomplete-field" />
            </AutocompleteField>
          </FormControlField>
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
        <FormControlMessage>Message</FormControlMessage>
      </FormControl>,
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

describe('when given autocomplete component as select', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should render the default check icon only on the selected option', () => {
    render(
      <Autocomplete asSelect value="item-1" defaultInputValue="item-1">
        <AutocompleteField>
          <input data-testid="autocomplete-field" />
        </AutocompleteField>
        <AutocompleteList>
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
        </AutocompleteList>
      </Autocomplete>,
    );

    fireEvent.click(screen.getByTestId('autocomplete-field'));

    const selected = screen.getByTestId('autocomplete-option-1');
    const unselected = screen.getByTestId('autocomplete-option-2');

    expect(selected).toHaveAttribute('aria-selected', 'true');
    expect(
      selected.querySelector('[data-role="list-cell-selected-icon-check"]'),
    ).toBeInTheDocument();

    expect(unselected).toHaveAttribute('aria-selected', 'false');
    expect(
      unselected.querySelector('[data-role="list-cell-selected-icon-check"]'),
    ).not.toBeInTheDocument();
  });

  it('should render the given trailingContent instead of the default check icon', () => {
    render(
      <Autocomplete asSelect value="item-1" defaultInputValue="item-1">
        <AutocompleteField>
          <input data-testid="autocomplete-field" />
        </AutocompleteField>
        <AutocompleteList>
          <AutocompleteOption
            value="item-1"
            data-testid="autocomplete-option-1"
            trailingContent={<span data-testid="custom-trailing">New</span>}
          >
            Item 1
          </AutocompleteOption>
        </AutocompleteList>
      </Autocomplete>,
    );

    fireEvent.click(screen.getByTestId('autocomplete-field'));

    const option = screen.getByTestId('autocomplete-option-1');

    expect(screen.getByTestId('custom-trailing')).toBeInTheDocument();
    expect(
      option.querySelector('[data-role="list-cell-selected-icon-check"]'),
    ).not.toBeInTheDocument();
  });

  it('should render the given trailingContent on an unselected option', () => {
    render(
      <Autocomplete asSelect value="item-1" defaultInputValue="item-1">
        <AutocompleteField>
          <input data-testid="autocomplete-field" />
        </AutocompleteField>
        <AutocompleteList>
          <AutocompleteOption value="item-1">Item 1</AutocompleteOption>
          <AutocompleteOption
            value="item-2"
            data-testid="autocomplete-option-2"
            trailingContent={<span data-testid="custom-trailing">New</span>}
          >
            Item 2
          </AutocompleteOption>
        </AutocompleteList>
      </Autocomplete>,
    );

    fireEvent.click(screen.getByTestId('autocomplete-field'));

    expect(screen.getByTestId('autocomplete-option-2')).toContainElement(
      screen.getByTestId('custom-trailing'),
    );
  });
});
