import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconPin = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.8999 4.3H16.9998V2.5H6.99976V4.3H8.09985V9.69807L6.20945 13.1695C6.05759 13.4484 6.06392 13.7867 6.2261 14.0596C6.38829 14.3326 6.68232 14.5 6.99985 14.5L11.0999 14.5V20.5L11.9999 21.5L12.8999 20.5V14.5L16.9999 14.5C17.3174 14.5 17.6114 14.3326 17.7736 14.0596C17.9358 13.7867 17.9421 13.4484 17.7903 13.1695L15.8999 9.69807V4.3ZM9.89985 4.39996V9.92723C9.89985 10.0776 9.86217 10.2256 9.79026 10.3577L8.51474 12.7H15.485L14.2094 10.3577C14.1375 10.2256 14.0999 10.0776 14.0999 9.92723V4.39996H9.89985Z"
      />
    </svg>
  );
};

export default IconPin;
