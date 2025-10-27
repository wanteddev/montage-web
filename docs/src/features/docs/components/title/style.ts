import { css } from '@wanteddev/wds';

export const titleSectionWrapperStyle = css`
  margin-bottom: 24px;
`;

export const thumbnailStyle = css`
  margin-block: 8px 32px;
  border-radius: 24px;
  overflow: hidden;
  aspect-ratio: 21/9;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
