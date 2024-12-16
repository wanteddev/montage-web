import { forwardRef } from 'react';

import { FlexBox } from '../..';

import {
  PAGINATION_INPUT_NAME,
  PAGINATION_NAME,
  PAGINATION_SELECT_NAME,
} from './constants';

import type { FlexBoxProps } from '../flex-box/types';
import type { PaginationProps } from './types';
import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { ForwardedRef } from 'react';

const Pagination = forwardRef(
  (
    { children, ...props }: DefaultComponentProps<PaginationProps, 'ul'>,
    ref: ForwardedRef<HTMLUListElement>,
  ) => {
    return (
      <FlexBox as="ul" ref={ref} role="list" flexDirection="column" {...props}>
        {children}
      </FlexBox>
    );
  },
);

Pagination.displayName = PAGINATION_NAME;

const PaginationSelect = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<FlexBoxProps, 'div'>
>((props, ref) => {
  return <FlexBox ref={ref} {...props} />;
});

PaginationSelect.displayName = PAGINATION_SELECT_NAME;

const PaginationInput = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<FlexBoxProps, 'div'>
>((props, ref) => {
  return <FlexBox ref={ref} {...props} />;
});

PaginationInput.displayName = PAGINATION_INPUT_NAME;

export { Pagination, PaginationSelect, PaginationInput };
