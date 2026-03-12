import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import {
  Accordion,
  AccordionDescription,
  AccordionDetails,
  AccordionSummary,
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

describe('when given accordion component', () => {
  beforeEach(() => {
    render(
      <Accordion>
        <AccordionSummary data-testid="accordion-summary">
          Summary
        </AccordionSummary>

        <AccordionDetails data-testid="accordion-details">
          <AccordionDescription data-testid="accordion-description">
            Details
          </AccordionDescription>
        </AccordionDetails>
      </Accordion>,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should render accordion component', () => {
    expect(screen.getByTestId('accordion-summary')).toBeInTheDocument();
    expect(screen.queryByTestId('accordion-details')).not.toBeInTheDocument();
  });

  it('should expand accordion when summary is clicked', () => {
    fireEvent.click(screen.getByTestId('accordion-summary'));

    expect(screen.getByTestId('accordion-details')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('accordion-summary'));

    expect(screen.queryByTestId('accordion-details')).not.toBeInTheDocument();
  });

  it('should pass accessibility test', async () => {
    expect(
      await axe(screen.getByTestId('accordion-summary')),
    ).toHaveNoViolations();

    fireEvent.click(screen.getByTestId('accordion-summary'));

    expect(screen.getByTestId('accordion-details')).toBeInTheDocument();

    expect(
      await axe(screen.getByTestId('accordion-summary')),
    ).toHaveNoViolations();
    expect(
      await axe(screen.getByTestId('accordion-details')),
    ).toHaveNoViolations();
  });
});

describe('when given accordion component with disabled prop', () => {
  beforeEach(() => {
    render(
      <Accordion disabled>
        <AccordionSummary data-testid="accordion-summary">
          Summary
        </AccordionSummary>

        <AccordionDetails data-testid="accordion-details">
          <AccordionDescription data-testid="accordion-description">
            Details
          </AccordionDescription>
        </AccordionDetails>
      </Accordion>,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should not expand accordion when summary is clicked', () => {
    fireEvent.click(screen.getByTestId('accordion-summary'));

    expect(screen.queryByTestId('accordion-details')).not.toBeInTheDocument();
  });
});
