import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconChevronRightThickSmall = (props: Props) => {
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
        d="M8.58144 4.58096C8.07376 5.08864 8.07376 5.91175 8.58144 6.41943L14.1622 12.0002L8.58145 17.581C8.07376 18.0886 8.07376 18.9118 8.58145 19.4194C9.08913 19.9271 9.91224 19.9271 10.4199 19.4194L16.9199 12.9194C17.4276 12.4118 17.4276 11.5886 16.9199 11.081L10.4199 4.58096C9.91224 4.07327 9.08913 4.07327 8.58144 4.58096Z"
      />
    </svg>
  );
};

export default IconChevronRightThickSmall;
