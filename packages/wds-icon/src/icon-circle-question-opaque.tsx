import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 이해에 도움이 되는 정보를 표시할 때 사용합니다.
 * 키워드: 물음표, 추가 정보, Question, Additional Information
 * 속성: Solid
 */
const IconCircleQuestionOpaque = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
    return (
      <Box
        as="svg"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        ref={ref}
        {...props}
      >
        <rect x="6" y="6" width="12" height="12" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.09991 11.9996C2.09991 6.53199 6.53227 2.09961 11.9999 2.09961C17.4675 2.09961 21.8998 6.53199 21.8998 11.9996C21.8998 17.4672 17.4675 21.8996 11.9999 21.8996C6.53227 21.8996 2.09991 17.4672 2.09991 11.9996ZM11.1098 13.116C11.0129 13.6404 11.4601 14.0795 11.9934 14.0795C12.5259 14.0795 12.9298 13.6323 13.1103 13.1314C13.3451 12.4802 13.8168 12.0837 14.2873 11.6881C14.9461 11.1344 15.6024 10.5826 15.6024 9.33701C15.6024 7.41418 14.0444 6.28177 12.0608 6.28177C10.2581 6.28177 8.89851 7.2321 8.50115 8.77479C8.36809 9.2914 8.81583 9.73221 9.34929 9.73221C9.8814 9.73221 10.2723 9.27188 10.519 8.80043C10.7842 8.29361 11.2942 8.00443 11.9848 7.99939C12.9348 8.00699 13.596 8.5542 13.596 9.41301C13.596 10.11 13.1589 10.4453 12.6454 10.8392C12.0477 11.2977 11.3463 11.8357 11.1098 13.116ZM10.7688 16.4659C10.7612 17.1499 11.278 17.6515 12 17.6515C12.7068 17.6515 13.2236 17.1499 13.2312 16.4659C13.2236 15.7819 12.7068 15.2803 12 15.2803C11.278 15.2803 10.7612 15.7819 10.7688 16.4659Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconCircleQuestionOpaque;
