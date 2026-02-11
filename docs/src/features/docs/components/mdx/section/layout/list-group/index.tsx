import { Typography } from '@wanteddev/wds';
import { Fragment } from 'react';

import { ulStyle } from './style';

import type { DescriptionListItem } from '../types';

type ListGroupProps = {
  items: Array<DescriptionListItem>;
};

const ListGroup = ({ items }: ListGroupProps) => {
  return (
    <Typography
      variant="body2-reading"
      weight="medium"
      as="ul"
      color="semantic.label.neutral"
      sx={ulStyle}
    >
      {items.map((item, index) => (
        <Fragment key={index}>
          <li>{item.content}</li>
          {item.children.length > 0 && <ListGroup items={item.children} />}
        </Fragment>
      ))}
    </Typography>
  );
};

export default ListGroup;
