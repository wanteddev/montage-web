import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconChevronUpThickSmall = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4.08071 15.9194C4.58839 16.4271 5.41151 16.4271 5.91919 15.9194L11.9999 9.83867L18.0807 15.9194C18.5884 16.4271 19.4115 16.4271 19.9192 15.9194C20.4269 15.4118 20.4269 14.5886 19.9192 14.081L12.9192 7.08096C12.4115 6.57327 11.5884 6.57327 11.0807 7.08096L4.08071 14.081C3.57303 14.5886 3.57303 15.4118 4.08071 15.9194Z" />
    </svg>
  );
};

export default IconChevronUpThickSmall;
