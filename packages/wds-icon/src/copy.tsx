import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconCopy = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09985 4.0001C2.09985 2.95076 2.95051 2.1001 3.99985 2.1001H15.9999C17.0492 2.1001 17.8999 2.95076 17.8999 4.0001V16.0001C17.8999 17.0494 17.0492 17.9001 15.9999 17.9001H3.99985C2.95051 17.9001 2.09985 17.0494 2.09985 16.0001V4.0001ZM3.99985 3.9001C3.94463 3.9001 3.89985 3.94487 3.89985 4.0001V16.0001C3.89985 16.0553 3.94463 16.1001 3.99985 16.1001H15.9999C16.0551 16.1001 16.0999 16.0553 16.0999 16.0001V4.0001C16.0999 3.94487 16.0551 3.9001 15.9999 3.9001H3.99985Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.0999 20.0001V9.0001H21.8999V20.0001C21.8999 21.0494 21.0492 21.9001 19.9999 21.9001H8.99985V20.1001H19.9999C20.0551 20.1001 20.0999 20.0553 20.0999 20.0001Z"
      />
    </svg>
  );
};

export default IconCopy;
