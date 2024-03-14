import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconHeartFill = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9996 4.96814C14.1671 2.56703 17.8388 2.30168 20.3136 4.51059C22.9571 6.87009 23.1084 11.0531 20.6513 13.6116L20.6412 13.622L13.1696 21.1548C12.5259 21.8183 11.4733 21.8183 10.8296 21.1548L3.35797 13.622L3.34781 13.6116C0.890834 11.0531 1.04205 6.8701 3.68555 4.5106C6.16033 2.30167 9.8321 2.56703 11.9996 4.96814Z"
      />
    </svg>
  );
};

export default IconHeartFill;
