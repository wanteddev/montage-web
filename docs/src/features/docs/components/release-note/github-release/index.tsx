import { useQueries } from '@tanstack/react-query';
import { ContentBadge, FlexBox, Loading, Typography } from '@wanteddev/wds';
import Link from 'next/link';
import { IconCircleExclamationFill } from '@wanteddev/wds-icon';
import semver from 'semver';

import { getGithubReleaseQueryOptions } from './helpers';
import { releaseBadgeStyle, releaseStyle } from './style';
import { GITHUB_RELEASES_INFO } from './constants';

const GithubRelease = () => {
  const results = useQueries({
    queries: GITHUB_RELEASES_INFO.map(({ repository }) =>
      getGithubReleaseQueryOptions(repository),
    ),
  });

  return (
    <FlexBox flexDirection="column">
      {GITHUB_RELEASES_INFO.map(({ platform, repository, href }, index) => {
        const result = results.at(index)!;

        return (
          <FlexBox
            key={repository}
            sx={releaseStyle}
            alignItems="center"
            justifyContent="space-between"
            as={Link}
            target="_blank"
            rel="noopener noreferrer"
            href={href}
          >
            <Typography
              variant="body2"
              weight="bold"
              color="semantic.label.normal"
              sx={{ padding: '1px 0px' }}
            >
              {platform}
            </Typography>

            {result.isLoading ? (
              <Loading
                aria-label="loading.."
                variant="circular"
                size="16px"
                sx={{ margin: '0px' }}
              />
            ) : result.isError ? (
              <IconCircleExclamationFill
                aria-label="Failed to load release note"
                sx={(theme) => ({
                  color: theme.semantic.label.assistive,
                  fontSize: '16px',
                })}
              />
            ) : (
              <FlexBox gap="12px" alignItems="center">
                <Typography
                  variant="caption1"
                  weight="medium"
                  color="semantic.label.alternative"
                >
                  {result.data?.created_at.split('T')[0]}
                </Typography>

                <ContentBadge
                  color="neutral"
                  size="small"
                  variant="solid"
                  sx={releaseBadgeStyle}
                >
                  {semver.parse(result.data?.tag_name)?.version ?? 'Unknown'}
                </ContentBadge>
              </FlexBox>
            )}
          </FlexBox>
        );
      })}
    </FlexBox>
  );
};

export default GithubRelease;
