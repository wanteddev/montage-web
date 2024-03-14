import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconTune = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 8.99998H3V7.19998H12V8.99998Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 17H12V15.2H21V17Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 8.99998H17V7.19998H21V8.99998Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 17H3V15.2H7V17Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 6.3C13.5611 6.3 12.8 7.06112 12.8 8C12.8 8.93888 13.5611 9.7 14.5 9.7C15.4389 9.7 16.2 8.93888 16.2 8C16.2 7.06112 15.4389 6.3 14.5 6.3ZM11 8C11 6.067 12.567 4.5 14.5 4.5C16.433 4.5 18 6.067 18 8C18 9.933 16.433 11.5 14.5 11.5C12.567 11.5 11 9.933 11 8Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.49999 14.3C8.56111 14.3 7.79999 15.0611 7.79999 16C7.79999 16.9389 8.56111 17.7 9.49999 17.7C10.4389 17.7 11.2 16.9389 11.2 16C11.2 15.0611 10.4389 14.3 9.49999 14.3ZM5.99999 16C5.99999 14.067 7.567 12.5 9.49999 12.5C11.433 12.5 13 14.067 13 16C13 17.933 11.433 19.5 9.49999 19.5C7.567 19.5 5.99999 17.933 5.99999 16Z"
      />
    </svg>
  );
};

export default IconTune;
