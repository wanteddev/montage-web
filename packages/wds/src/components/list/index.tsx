import { forwardRef } from 'react';

import { FlexBox } from '..';

import { LIST_NAME } from './constants';
import { listStyle } from './style';

import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { ListProps } from './types';

const List = forwardRef(
  <E extends ElementType = 'ul'>(
    { as, ...props }: PolymorphicProps<ListProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return (
      <FlexBox
        ref={ref}
        as={(as || 'ul') as E}
        flexDirection="column"
        gap="24px"
        sx={[listStyle, props.sx]}
        {...props}
      />
    );
  },
) as PolymorphicComponent<ListProps, 'ul'>;

List.displayName = LIST_NAME;

export { List };
