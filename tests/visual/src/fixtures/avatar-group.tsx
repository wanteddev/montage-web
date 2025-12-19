import { Avatar, AvatarGroup } from '@wanteddev/wds';

export const SmallAvatarGroup = () => {
  return (
    <>
      <AvatarGroup size="small">
        <Avatar variant="person" size="small" />
        <Avatar variant="person" size="small" />
        <Avatar variant="person" size="small" />
      </AvatarGroup>
      <AvatarGroup size="small">
        <Avatar variant="company" size="small" />
        <Avatar variant="company" size="small" />
        <Avatar variant="company" size="small" />
        <Avatar variant="company" size="small" />
      </AvatarGroup>
    </>
  );
};

export const XSmallAvatarGroup = () => {
  return (
    <>
      <AvatarGroup size="xsmall">
        <Avatar variant="person" size="xsmall" />
        <Avatar variant="person" size="xsmall" />
        <Avatar variant="person" size="xsmall" />
      </AvatarGroup>
      <AvatarGroup size="xsmall">
        <Avatar variant="academy" size="xsmall" />
        <Avatar variant="academy" size="xsmall" />
        <Avatar variant="academy" size="xsmall" />
        <Avatar variant="academy" size="xsmall" />
      </AvatarGroup>
    </>
  );
};
