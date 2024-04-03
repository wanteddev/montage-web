import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconCircleCheckFill = (props: Props) => {
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
        d="M17.1457 9.62695L10.6763 16.2923L6.85402 12.3542L8.14566 11.1006L10.6763 13.7079L15.854 8.37329L17.1457 9.62695ZM2.09985 12.0001C2.09985 6.53248 6.53223 2.1001 11.9999 2.1001C17.4675 2.1001 21.8999 6.53248 21.8999 12.0001C21.8999 17.4677 17.4675 21.9001 11.9999 21.9001C6.53223 21.9001 2.09985 17.4677 2.09985 12.0001Z"
      />
    </svg>
  );
};

export default IconCircleCheckFill;
