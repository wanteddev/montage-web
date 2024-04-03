import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconLogoYoutube = (props: Props) => {
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
        d="M22.538 6.7088C22.285 5.7628 21.537 5.0148 20.591 4.7618C18.875 4.2998 12 4.2998 12 4.2998C12 4.2998 5.125 4.2998 3.409 4.7618C2.463 5.0148 1.715 5.7628 1.462 6.7088C1 8.4248 1 11.9998 1 11.9998C1 11.9998 1 15.5748 1.462 17.2908C1.715 18.2368 2.463 18.9848 3.409 19.2378C5.125 19.6998 12 19.6998 12 19.6998C12 19.6998 18.875 19.6998 20.591 19.2378C21.537 18.9848 22.285 18.2368 22.538 17.2908C23 15.5748 23 11.9998 23 11.9998C23 11.9998 23 8.4248 22.538 6.7088ZM9.8 15.2998V8.6998L15.52 11.9998L9.8 15.2998Z"
      />
    </svg>
  );
};

export default IconLogoYoutube;
