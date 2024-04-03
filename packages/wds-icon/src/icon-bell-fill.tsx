import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconBellFill = (props: Props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9998 2.09961C9.77454 2.09961 7.94515 2.8874 6.68766 4.37394C5.44753 5.83995 4.84979 7.88271 4.84979 10.2496L4.84979 10.9996C4.84979 13.4647 4.16656 14.9244 3.19343 15.8677C2.81189 16.2376 2.77229 16.7494 2.90867 17.1259C3.04738 17.5089 3.42748 17.8996 3.99934 17.8996H20.0002C20.5721 17.8996 20.9522 17.5089 21.0909 17.1259C21.2273 16.7494 21.1877 16.2376 20.8061 15.8677C19.833 14.9244 19.1498 13.4647 19.1498 10.9996L19.1498 10.2496C19.1498 7.88271 18.552 5.83995 17.3119 4.37394C16.0544 2.8874 14.225 2.09961 11.9998 2.09961Z"
        fill="currentColor"
      />
      <path
        d="M9.0999 20.0996V21.8996H14.8999V20.0996H9.0999Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconBellFill;
