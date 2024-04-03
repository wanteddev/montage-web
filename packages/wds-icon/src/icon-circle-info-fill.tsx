import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconCircleInfoFill = (props: Props) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.1001C6.53223 2.1001 2.09985 6.53248 2.09985 12.0001C2.09985 17.4677 6.53223 21.9001 11.9999 21.9001C17.4675 21.9001 21.8999 17.4677 21.8999 12.0001C21.8999 6.53248 17.4675 2.1001 11.9999 2.1001ZM11.9998 7.00012C11.4476 7.00012 10.9998 7.44784 10.9998 8.00012C10.9998 8.55241 11.4476 9.00012 11.9998 9.00012C12.5521 9.00012 12.9998 8.55241 12.9998 8.00012C12.9998 7.44784 12.5521 7.00012 11.9998 7.00012ZM11.0998 17.0001V10.5001H12.8998V17.0001H11.0998Z"
      />
    </svg>
  );
};

export default IconCircleInfoFill;
