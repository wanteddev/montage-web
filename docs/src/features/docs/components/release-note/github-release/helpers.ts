import { Octokit } from '@octokit/core';
import { queryOptions } from '@tanstack/react-query';

const octokit = new Octokit();

export const getGithubRelease = async (repository: string) => {
  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/releases/latest',
    {
      owner: 'wanteddev',
      repo: repository,
    },
  );

  return data;
};

export const getGithubReleaseQueryOptions = (repository: string) =>
  queryOptions({
    queryKey: ['github-release', repository],
    queryFn: () => getGithubRelease(repository),
    staleTime: 1000 * 60 * 60,
    retry: false,
  });
