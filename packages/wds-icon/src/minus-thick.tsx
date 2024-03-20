import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconMinusThick = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M1.95007 12.0002C1.95007 11.2822 2.5321 10.7002 3.25007 10.7002H20.7501C21.468 10.7002 22.0501 11.2822 22.0501 12.0002C22.0501 12.7182 21.468 13.3002 20.7501 13.3002H3.25007C2.5321 13.3002 1.95007 12.7182 1.95007 12.0002Z"
      />
    </svg>
  );
};

export default IconMinusThick;
