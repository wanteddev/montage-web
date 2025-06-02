import { css, respondTo } from '@wanteddev/wds';

export const sectionLayoutStyle = css`
  && {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 0px;
      padding-top: 0px;
      border: none;
    }
  }

  margin-bottom: 120px;

  ${respondTo('620px')} {
    margin-bottom: 108px;
  }

  [data-role='section-figure-group']:first-of-type {
    margin-top: 24px;
  }
`;
