import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconArrowUp = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.6365 2.86321C12.285 2.51174 11.7152 2.51174 11.3637 2.86321L4.3637 9.86321C4.01223 10.2147 4.01223 10.7845 4.3637 11.136C4.71517 11.4875 5.28502 11.4875 5.63649 11.136L11.1001 5.6724V20.4996C11.1001 20.9967 11.503 21.3996 12.0001 21.3996C12.4972 21.3996 12.9001 20.9967 12.9001 20.4996V5.6724L18.3637 11.136C18.7152 11.4875 19.285 11.4875 19.6365 11.136C19.988 10.7845 19.988 10.2147 19.6365 9.86321L12.6365 2.86321Z"
      />
    </svg>
  );
};

export default IconArrowUp;
