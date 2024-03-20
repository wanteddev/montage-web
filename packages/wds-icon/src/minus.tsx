import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconMinus = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M2.34985 11.9996C2.34985 11.5026 2.7528 11.0996 3.24985 11.0996H20.7499C21.2469 11.0996 21.6499 11.5026 21.6499 11.9996C21.6499 12.4967 21.2469 12.8996 20.7499 12.8996H3.24985C2.7528 12.8996 2.34985 12.4967 2.34985 11.9996Z"
      />
    </svg>
  );
};

export default IconMinus;
