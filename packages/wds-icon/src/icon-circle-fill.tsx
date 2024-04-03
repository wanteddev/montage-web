import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconCircleFill = (props: Props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09961 12.0001C2.09961 6.53248 6.53199 2.1001 11.9996 2.1001C17.4672 2.1001 21.8996 6.53248 21.8996 12.0001C21.8996 17.4677 17.4672 21.9001 11.9996 21.9001C6.53199 21.9001 2.09961 17.4677 2.09961 12.0001Z"
      />
    </svg>
  );
};

export default IconCircleFill;
