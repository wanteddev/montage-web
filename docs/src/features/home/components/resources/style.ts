import { css } from '@wanteddev/wds';

export const wrapperStyle = css`
  &:not(
      :has(
          [data-animation-state='animation-pending'],
          [data-animation-state='animation-start']
        )
    ) {
    hr {
      opacity: 1;
    }
  }
`;
