import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconHeartFill = (props: Props) => {
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
        d="M11.9998 4.96814C14.1673 2.56703 17.839 2.30168 20.3139 4.51059C22.9574 6.87009 23.1086 11.0531 20.6516 13.6116L20.6414 13.622L13.1698 21.1548C12.5261 21.8183 11.4736 21.8183 10.8298 21.1548L3.35821 13.622L3.34805 13.6116C0.891079 11.0531 1.0423 6.8701 3.68579 4.5106C6.16057 2.30167 9.83233 2.56703 11.9998 4.96814Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconHeartFill;
