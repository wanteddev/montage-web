import { css } from '@wanteddev/wds';

export const wrapperStyle = css`
  margin-block: 40px 64px;
  border-radius: 24px;
  overflow: hidden;
  aspect-ratio: 380/113;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
