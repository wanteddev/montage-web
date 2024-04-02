import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconPlay = (props: Props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
    >
      <path fill="currentColor" d="M7.5 19V5L18.5 12L7.5 19Z" />
    </svg>
  );
};

export default IconPlay;
