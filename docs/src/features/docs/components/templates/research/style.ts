import { css } from '@wanteddev/wds';

export const showcaseWrapperStyle = css`
  margin-top: 16px;
`;

export const showcaseContentBoxStyle = css`
  position: relative;
  border: 1px solid var(--semantic-line-normal-neutral);
  border-radius: 16px;
  overflow: hidden;
  background-color: var(--semantic-background-normal-normal);
`;

export const showcaseInternalHeaderStyle = css`
  padding: 10px 16px;
  border-bottom: 1px solid var(--semantic-line-normal-neutral);
  background-color: var(--semantic-background-normal-normal);
  min-height: 60px;
`;

export const showcaseBodyStyle = css`
  position: relative;
  background-color: var(--semantic-background-normal-alternative);
`;

export const showcasePreviewImageStyle = css`
  padding: 20px;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    max-width: 1440px;
    height: auto;
    display: block;
  }
`;
