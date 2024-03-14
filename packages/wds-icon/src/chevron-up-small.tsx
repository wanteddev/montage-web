import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconChevronUpSmall = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4.36352 15.636C4.71499 15.9875 5.28484 15.9875 5.63631 15.636L11.9999 9.2724L18.3635 15.636C18.715 15.9875 19.2848 15.9875 19.6363 15.636C19.9878 15.2845 19.9878 14.7147 19.6363 14.3632L12.6363 7.36321C12.2848 7.01174 11.715 7.01174 11.3635 7.36321L4.36352 14.3632C4.01205 14.7147 4.01205 15.2845 4.36352 15.636Z" />
    </svg>
  );
};

export default IconChevronUpSmall;
