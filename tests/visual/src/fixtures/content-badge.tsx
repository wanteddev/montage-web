import { ContentBadge } from '@wanteddev/wds';

export const SolidContentBadge = () => {
  return (
    <>
      <ContentBadge variant="solid" size="xsmall" color="accent">
        Badge
      </ContentBadge>
      <ContentBadge variant="solid" size="small" color="accent">
        Badge
      </ContentBadge>
      <ContentBadge variant="solid" size="medium" color="accent">
        Badge
      </ContentBadge>
      <ContentBadge variant="solid" size="medium" color="neutral">
        Badge
      </ContentBadge>
    </>
  );
};

export const OutlinedContentBadge = () => {
  return (
    <>
      <ContentBadge variant="outlined" size="xsmall" color="accent">
        Badge
      </ContentBadge>
      <ContentBadge variant="outlined" size="small" color="accent">
        Badge
      </ContentBadge>
      <ContentBadge variant="outlined" size="medium" color="accent">
        Badge
      </ContentBadge>
      <ContentBadge variant="outlined" size="medium" color="neutral">
        Badge
      </ContentBadge>
    </>
  );
};
