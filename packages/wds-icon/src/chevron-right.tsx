import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconChevronRight = (props: Props) => {
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
        d="M7.86346 3.36272C7.51199 3.7142 7.51199 4.28405 7.86346 4.63552L15.2271 11.9991L7.86346 19.3627C7.51199 19.7142 7.51199 20.284 7.86346 20.6355C8.21493 20.987 8.78478 20.987 9.13625 20.6355L17.1362 12.6355C17.4877 12.284 17.4877 11.7142 17.1362 11.3627L9.13625 3.36272C8.78478 3.01125 8.21493 3.01125 7.86346 3.36272Z"
      />
    </svg>
  );
};

export default IconChevronRight;
