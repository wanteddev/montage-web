import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconArrowLeft = (props: Props) => {
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
        d="M2.8637 11.364C2.51223 11.7155 2.51223 12.2853 2.8637 12.6368L9.8637 19.6368C10.2152 19.9883 10.785 19.9883 11.1365 19.6368C11.488 19.2853 11.488 18.7155 11.1365 18.364L5.67289 12.9004H20.5001C20.9972 12.9004 21.4001 12.4974 21.4001 12.0004C21.4001 11.5033 20.9972 11.1004 20.5001 11.1004L5.67289 11.1004L11.1365 5.63679C11.488 5.28531 11.488 4.71547 11.1365 4.36399C10.785 4.01252 10.2152 4.01252 9.8637 4.36399L2.8637 11.364Z"
      />
    </svg>
  );
};

export default IconArrowLeft;
