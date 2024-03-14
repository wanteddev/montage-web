import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconLineHorizontal = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.09985 12.0001C5.09985 11.503 5.5028 11.1001 5.99985 11.1001H17.9999C18.4969 11.1001 18.8999 11.503 18.8999 12.0001C18.8999 12.4972 18.4969 12.9001 17.9999 12.9001H5.99985C5.5028 12.9001 5.09985 12.4972 5.09985 12.0001Z"
      />
    </svg>
  );
};

export default IconLineHorizontal;
