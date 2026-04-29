import { css } from '@wanteddev/wds';

export const handleStyle = (width: number) => css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(50% + ${width / 2 + 20}px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  transform: translateX(-50%);
  cursor: ew-resize;
  z-index: 2;
  transition: left 200ms ease;

  &:hover > div,
  &:active > div {
    background-color: var(--semantic-label-alternative);
  }

  &:active {
    transition: none;
  }
`;

export const handleGripStyle = css`
  width: 8px;
  height: 40px;
  border-radius: 9999px;
  background-color: var(--semantic-line-normal-normal);
  transition: background-color 160ms ease;
`;
