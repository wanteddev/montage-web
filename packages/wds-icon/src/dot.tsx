import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconDot = (props: Props) => {
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
        d="M18 12C18 15.312 15.312 18.0001 12 18.0001C8.688 18.0001 6 15.312 6 12C6 8.68801 8.688 6 12 6C15.312 6 18 8.68801 18 12Z"
      />
    </svg>
  );
};

export default IconDot;
