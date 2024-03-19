import { typeStyle } from './style';

import type { PropsWithChildren } from 'react';

const Type = (props: PropsWithChildren) => {
  return (
    <td>
      <span {...props} css={typeStyle} />
    </td>
  );
};

export default Type;
