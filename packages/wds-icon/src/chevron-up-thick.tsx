import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconChevronUpThick = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.08096 16.4194C3.58864 16.9271 4.41175 16.9271 4.91943 16.4194L12.0002 9.33867L19.0809 16.4194C19.5886 16.9271 20.4117 16.9271 20.9194 16.4194C21.4271 15.9118 21.4271 15.0886 20.9194 14.581L12.9194 6.58096C12.4117 6.07328 11.5886 6.07328 11.0809 6.58096L3.08096 14.581C2.57328 15.0886 2.57328 15.9118 3.08096 16.4194Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconChevronUpThick;
