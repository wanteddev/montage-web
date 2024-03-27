import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconSend = (props: Props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.04594 4.86724C3.62369 3.93457 4.59276 2.98148 5.51829 3.41916L21.5137 10.9835C22.3534 11.3806 22.3533 12.5754 21.5135 12.9724L5.42399 20.5779C4.49439 21.0174 3.52376 20.0547 3.9556 19.1215L7.26325 11.9738L4.04594 4.86724ZM19.4058 11.9777L6.39979 18.1257L8.81804 12.9H14.0308V11.1H8.84352L6.4718 5.86121L19.4058 11.9777Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconSend;
