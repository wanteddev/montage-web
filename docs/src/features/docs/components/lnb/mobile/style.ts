import { css, keyframes, respondMore } from '@wanteddev/wds';

const mountKeyframe = keyframes`
	0% {
		transform: translateX(100%);
	}
	100% {
		transform: translateX(0%);
	}
`;

export const containerStyle = css`
  animation: ${mountKeyframe} 0.3s cubic-bezier(0.2, 0, 0, 1);
  border-radius: 0px;
  max-height: calc(
    100% - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px)
  );
  width: 100%;
  max-width: 100%;

  --lnb-padding-left: 28px;

  &[data-status='close'],
  &[data-status='unmounted'] {
    transform: translate(100%, 0px) !important;
    transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1);
  }

  ${respondMore('500px')} {
    width: 75%;
    border-radius: 12px 0px 0px 12px;
    --lnb-padding-left: 48px;
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
