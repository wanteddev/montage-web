import { css } from '@wanteddev/wds';

export const linkStyle = css`
  padding: 16px 0;
  border-bottom: 1px solid var(--semantic-line-normal-neutral);
  text-decoration: none;
  cursor: pointer;

  &:hover [data-role='interaction-arrow'] {
    transform: translateX(2px);
    opacity: 1;
  }
`;

export const interactionArrowStyle = css`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: var(--semantic-label-alternative);
  opacity: 0.6;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
`;
