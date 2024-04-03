import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconCircleClose = (props: Props) => {
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
        d="M2.1001 12.0001C2.1001 6.53248 6.53248 2.1001 12.0001 2.1001C17.4677 2.1001 21.9001 6.53248 21.9001 12.0001C21.9001 17.4677 17.4677 21.9001 12.0001 21.9001C6.53248 21.9001 2.1001 17.4677 2.1001 12.0001ZM8.50009 7.22733L7.2273 8.50012L10.7273 12.0001L7.2273 15.5001L8.50009 16.7729L12.0001 13.2729L15.5001 16.7729L16.7729 15.5001L13.2729 12.0001L16.7729 8.50012L15.5001 7.22733L12.0001 10.7273L8.50009 7.22733Z"
      />
    </svg>
  );
};

export default IconCircleClose;
