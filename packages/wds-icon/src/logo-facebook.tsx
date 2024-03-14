import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconLogoFacebook = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12C2 16.99 5.66 21.13 10.44 21.88V14.89H7.9V12H10.44V9.8C10.44 7.29 11.93 5.91 14.22 5.91C15.31 5.91 16.46 6.11 16.46 6.11V8.57H15.2C13.96 8.57 13.57 9.34 13.57 10.13V12.01H16.34L15.9 14.9H13.57V21.89C18.35 21.14 22 16.99 22 12C22 6.48 17.53 2.01 12.01 2.01L12 2Z"
      />
    </svg>
  );
};

export default IconLogoFacebook;
