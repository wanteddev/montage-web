import { css, respondMore } from '@wanteddev/wds';

export const homeTitleStyle = css`
  font-size: 24px;
  line-height: 120%;
  letter-spacing: -0.336px;
  font-style: normal;
  font-weight: 800;
  font-family: var(--font-family-wanted-sans);
  margin-bottom: 20px;

  ${respondMore('375px')} {
    font-size: 28px;
    line-height: 120%;
    letter-spacing: -0.392px;
  }

  ${respondMore('620px')} {
    margin-bottom: 28px;
  }

  ${respondMore('780px')} {
    font-size: 32px;
    line-height: 120%;
    letter-spacing: -0.768px;
  }

  ${respondMore('1360px')} {
    font-size: 40px;
    line-height: 120%;
    letter-spacing: -0.96px;
  }
`;
