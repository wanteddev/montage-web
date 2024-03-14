import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconChevronDownThickSmall = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4.08071 8.08096C4.58839 7.57327 5.41151 7.57327 5.91919 8.08096L12 14.1617L18.0807 8.08096C18.5884 7.57327 19.4115 7.57327 19.9192 8.08096C20.4269 8.58864 20.4269 9.41175 19.9192 9.91943L12.9192 16.9194C12.4115 17.4271 11.5884 17.4271 11.0807 16.9194L4.08071 9.91943C3.57303 9.41175 3.57303 8.58864 4.08071 8.08096Z" />
    </svg>
  );
};

export default IconChevronDownThickSmall;
