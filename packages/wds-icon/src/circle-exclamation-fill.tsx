import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconCircleExclamationFill = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09985 12.0001C2.09985 6.53248 6.53223 2.1001 11.9999 2.1001C17.4675 2.1001 21.8999 6.53248 21.8999 12.0001C21.8999 17.4677 17.4675 21.9001 11.9999 21.9001C6.53223 21.9001 2.09985 17.4677 2.09985 12.0001ZM12.9998 16.2501C12.9998 16.8024 12.5521 17.2501 11.9998 17.2501C11.4476 17.2501 10.9998 16.8024 10.9998 16.2501C10.9998 15.6978 11.4476 15.2501 11.9998 15.2501C12.5521 15.2501 12.9998 15.6978 12.9998 16.2501ZM11.0998 6.75012V13.7501H12.8998V6.75012H11.0998Z"
      />
    </svg>
  );
};

export default IconCircleExclamationFill;
