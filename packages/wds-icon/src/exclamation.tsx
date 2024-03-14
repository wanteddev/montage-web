import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconExclamation = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M13.2 18.8C13.2 19.4627 12.6628 20 12 20C11.3373 20 10.8 19.4627 10.8 18.8C10.8 18.1372 11.3373 17.6 12 17.6C12.6628 17.6 13.2 18.1372 13.2 18.8Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1001 15.4V4H12.9001V15.4H11.1001Z"
      />
    </svg>
  );
};

export default IconExclamation;
