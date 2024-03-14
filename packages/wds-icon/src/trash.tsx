import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconTrash = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 3.9499H15V2.1499H9V3.9499ZM21 6.84993H19.65V19.9499C19.65 20.9993 18.7993 21.8499 17.75 21.8499H6.25C5.20066 21.8499 4.35 20.9993 4.35 19.9499V6.84993H3V5.04993H21V6.84993ZM6.15 6.84993H17.85V19.9499C17.85 20.0052 17.8052 20.0499 17.75 20.0499H6.25C6.19477 20.0499 6.15 20.0052 6.15 19.9499V6.84993ZM9 16.4499V10.4499H10.8V16.4499H9ZM13.2 10.4499V16.4499H15V10.4499H13.2Z"
      />
    </svg>
  );
};

export default IconTrash;
