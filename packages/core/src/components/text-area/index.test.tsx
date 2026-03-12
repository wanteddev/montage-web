import { cleanup, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import { FormControl, FormField, FormLabel, FormMessage } from '../form';

import { TextArea, TextAreaContent } from '.';

describe('when given text area component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should pass accessibility test with form field', async () => {
    render(
      <FormField>
        <FormLabel>Label</FormLabel>
        <FormControl>
          <TextArea data-testid="text-area" />
        </FormControl>
        <FormMessage>Message</FormMessage>
      </FormField>,
    );

    expect(await axe(screen.getByTestId('text-area'))).toHaveNoViolations();
  });
});

describe('when given text area component with characterCounter', () => {
  it('should render with characterCounter', () => {
    render(
      <TextArea
        data-testid="text-area"
        value="123456789"
        leadingContent={
          <TextAreaContent
            data-testid="text-area-content"
            variant="characterCounter"
          >
            200
          </TextAreaContent>
        }
      />,
    );

    expect(screen.getByTestId('text-area-content')).toHaveTextContent('9/200');
  });
});
