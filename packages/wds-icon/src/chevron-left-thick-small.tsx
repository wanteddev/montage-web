import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconChevronLeftThickSmall = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M15.4197 4.58071C15.9274 5.08839 15.9274 5.91151 15.4197 6.41919L9.83892 12L15.4197 17.5807C15.9274 18.0884 15.9274 18.9115 15.4197 19.4192C14.912 19.9269 14.0889 19.9269 13.5812 19.4192L7.0812 12.9192C6.57352 12.4115 6.57352 11.5884 7.0812 11.0807L13.5812 4.58071C14.0889 4.07303 14.912 4.07303 15.4197 4.58071Z"
      />
    </svg>
  );
};

export default IconChevronLeftThickSmall;
