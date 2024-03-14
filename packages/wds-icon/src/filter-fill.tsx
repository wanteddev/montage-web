import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconFilterFill = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.91442 5.91637C2.78086 4.70185 3.64211 2.71997 5.30342 2.71997H18.701C20.3623 2.71997 21.2235 4.70186 20.09 5.91637L14.2843 11.4747V20.37C14.2843 20.6697 14.1351 20.9498 13.8863 21.117C13.6375 21.2842 13.3218 21.3165 13.0442 21.2033L10.3442 19.5709C10.0056 19.4327 9.7843 19.1034 9.7843 18.7376V11.4747L3.91442 5.91637Z"
      />
    </svg>
  );
};

export default IconFilterFill;
