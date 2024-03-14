import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconChevronDownThick = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M3.08083 7.58096C3.58852 7.07327 4.41163 7.07327 4.91931 7.58096L12.0001 14.6617L19.0808 7.58096C19.5885 7.07327 20.4116 7.07327 20.9193 7.58096C21.427 8.08864 21.427 8.91175 20.9193 9.41943L12.9193 17.4194C12.4116 17.9271 11.5885 17.9271 11.0808 17.4194L3.08083 9.41943C2.57315 8.91175 2.57315 8.08864 3.08083 7.58096Z" />
    </svg>
  );
};

export default IconChevronDownThick;
