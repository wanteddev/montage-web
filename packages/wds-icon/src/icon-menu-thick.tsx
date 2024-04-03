import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconMenuThick = (props: Props) => {
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
        d="M2.75024 5C2.75024 4.30964 3.30989 3.75 4.00024 3.75H20.0002C20.6906 3.75 21.2502 4.30964 21.2502 5C21.2502 5.69036 20.6906 6.25 20.0002 6.25H4.00024C3.30989 6.25 2.75024 5.69036 2.75024 5Z"
      />
      <path
        fill="currentColor"
        d="M2.75024 19C2.75024 18.3096 3.30989 17.75 4.00024 17.75H20.0002C20.6906 17.75 21.2502 18.3096 21.2502 19C21.2502 19.6904 20.6906 20.25 20.0002 20.25H4.00024C3.30989 20.25 2.75024 19.6904 2.75024 19Z"
      />
      <path
        fill="currentColor"
        d="M4.00024 10.75C3.30989 10.75 2.75024 11.3096 2.75024 12C2.75024 12.6904 3.30989 13.25 4.00024 13.25H20.0002C20.6906 13.25 21.2502 12.6904 21.2502 12C21.2502 11.3096 20.6906 10.75 20.0002 10.75H4.00024Z"
      />
    </svg>
  );
};

export default IconMenuThick;
