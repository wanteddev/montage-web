import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconChevronLeft = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M16.1362 3.36285C16.4877 3.71432 16.4877 4.28417 16.1362 4.63564L8.77265 11.9992L16.1362 19.3628C16.4877 19.7143 16.4877 20.2842 16.1362 20.6356C15.7848 20.9871 15.2149 20.9871 14.8635 20.6356L6.86346 12.6356C6.51199 12.2842 6.51199 11.7143 6.86346 11.3628L14.8635 3.36285C15.2149 3.01138 15.7848 3.01138 16.1362 3.36285Z"
      />
    </svg>
  );
};

export default IconChevronLeft;
