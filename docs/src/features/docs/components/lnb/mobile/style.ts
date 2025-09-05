import { css, keyframes, respondTo } from '@wanteddev/wds';

const mountKeyframe = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
`;

export const unMountKeyframe = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
`;

export const containerStyle = css`
  max-height: calc(
    100% - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px)
  );
  border-radius: 12px 0px 0px 12px;
  width: 75%;
  animation: ${mountKeyframe} 0.3s cubic-bezier(0.2, 0, 0, 1);
  --lnb-padding-left: 48px;

  &[data-status='close'] {
    animation: ${unMountKeyframe} 0.3s cubic-bezier(0.2, 0, 0, 1);
  }

  ${respondTo('620px')} {
    border-radius: 0px;
    width: 100%;
    max-width: 100%;
    transition: none;
    animation: none;
    --lnb-padding-left: 28px;

    &[data-status='close'] {
      animation: none;
    }
  }
`;

export const wrapperStyle = css`
  padding: 0px;
  align-items: initial;
  justify-content: flex-end;

  [data-role='modal-dimmer'] {
    transition: opacity 0.3s cubic-bezier(0.2, 0, 0, 1);
  }
`;
