import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconSendFill = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.51841 3.41916C4.59288 2.98147 3.62382 3.93457 4.04606 4.86724L6.86776 11.1H14.0309V12.9H6.83477L3.95572 19.1215C3.52388 20.0547 4.49451 21.0174 5.42411 20.5779L21.5136 12.9724C22.3534 12.5754 22.3535 11.3806 21.5138 10.9835L5.51841 3.41916Z"
      />
    </svg>
  );
};

export default IconSendFill;
