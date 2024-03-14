import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconTemplateFill = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M3.00024 5C3.00024 3.89543 3.89567 3 5.00024 3H19.0002C20.1048 3 21.0002 3.89543 21.0002 5V8.2H3.00024V5Z"
      />
      <path
        fill="currentColor"
        d="M3.00024 10H8.50024V21H5.00024C3.89567 21 3.00024 20.1046 3.00024 19V10Z"
      />
      <path
        fill="currentColor"
        d="M21.0002 10H10.3002V21H19.0002C20.1048 21 21.0002 20.1046 21.0002 19V10Z"
      />
    </svg>
  );
};

export default IconTemplateFill;
