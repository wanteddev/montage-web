import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconArrowRight = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.1365 12.636C21.488 12.2845 21.488 11.7147 21.1365 11.3632L14.1365 4.36321C13.785 4.01174 13.2152 4.01174 12.8637 4.36321C12.5122 4.71469 12.5122 5.28453 12.8637 5.63601L18.3273 11.0996H3.5001C3.00304 11.0996 2.6001 11.5026 2.6001 11.9996C2.6001 12.4967 3.00304 12.8996 3.5001 12.8996H18.3273L12.8637 18.3632C12.5122 18.7147 12.5122 19.2845 12.8637 19.636C13.2152 19.9875 13.785 19.9875 14.1365 19.636L21.1365 12.636Z"
      />
    </svg>
  );
};

export default IconArrowRight;
