import { cleanup, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import {
  FormControl,
  FormControlField,
  FormControlLabel,
  FormControlMessage,
} from '../form-control';

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
