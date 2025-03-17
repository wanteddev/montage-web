import { FlexBox } from '@wanteddev/wds';
import { IconCircleInfoFill } from '@wanteddev/wds-icon';

import { noteStyle } from './style';

type Props = {
  variant?: 'normal';
  children: string;
};

const Note = ({ children }: Props) => {
  return (
    <FlexBox gap="12px" sx={noteStyle}>
      <IconCircleInfoFill />
      <div>{children}</div>
    </FlexBox>
  );
};

export default Note;
