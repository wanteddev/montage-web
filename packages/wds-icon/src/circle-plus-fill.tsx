import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconCirclePlusFill = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.0998 12.9001V17.0001H12.8998V12.9001H16.9998V11.1001H12.8998V7.00012H11.0998V11.1001H6.99985V12.9001H11.0998ZM2.09985 12.0001C2.09985 6.53248 6.53223 2.1001 11.9999 2.1001C17.4675 2.1001 21.8999 6.53248 21.8999 12.0001C21.8999 17.4677 17.4675 21.9001 11.9999 21.9001C6.53223 21.9001 2.09985 17.4677 2.09985 12.0001Z"
      />
    </svg>
  );
};

export default IconCirclePlusFill;
