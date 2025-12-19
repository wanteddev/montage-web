import { Avatar, AvatarButton, PushBadge } from '@wanteddev/wds';

export const DefaultAvatarButton = () => {
  return (
    <>
      <AvatarButton>
        <Avatar variant="person" size="small" />
      </AvatarButton>
      <AvatarButton>
        <Avatar variant="company" size="small" />
      </AvatarButton>
      <AvatarButton>
        <Avatar variant="academy" size="small" />
      </AvatarButton>
      <AvatarButton disabled>
        <Avatar variant="person" size="small" />
      </AvatarButton>
      <PushBadge>
        <AvatarButton>
          <Avatar variant="person" size="small" />
        </AvatarButton>
      </PushBadge>
    </>
  );
};
