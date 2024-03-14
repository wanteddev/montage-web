import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconPause = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 5H6.5V19H10V5ZM17.5 5H14V19H17.5V5Z"
      />
    </svg>
  );
};

export default IconPause;
