import { css } from '@wanteddev/wds';

export const toggleGroupStyle = css`
  align-items: center;
  height: 40px;
  padding: 4px;
  border-radius: 12px;
  background-color: var(--semantic-fill-alternative);
`;

export const toggleButtonStyle = (active: boolean) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${active
    ? 'var(--semantic-background-normal-normal)'
    : 'transparent'};
  color: ${active
    ? 'var(--semantic-label-normal)'
    : 'var(--semantic-label-alternative)'};
  box-shadow: ${active ? '0 1px 2px rgba(0, 0, 0, 0.06)' : 'none'};
  transition:
    background-color 160ms ease,
    color 160ms ease,
    box-shadow 160ms ease;

  &:hover {
    color: var(--semantic-label-normal);
  }

  & svg {
    width: 18px;
    height: 18px;
  }
`;
