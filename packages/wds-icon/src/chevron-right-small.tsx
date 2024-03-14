import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconChevronRightSmall = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M8.86419 4.86346C8.51272 5.21493 8.51272 5.78478 8.86419 6.13625L14.7278 11.9999L8.86419 17.8635C8.51272 18.2149 8.51272 18.7848 8.86419 19.1362C9.21566 19.4877 9.78551 19.4877 10.137 19.1362L16.637 12.6362C16.9885 12.2848 16.9885 11.7149 16.637 11.3635L10.137 4.86346C9.78551 4.51199 9.21566 4.51199 8.86419 4.86346Z"
      />
    </svg>
  );
};

export default IconChevronRightSmall;
