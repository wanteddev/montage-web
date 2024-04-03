import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconCaretDown = (props: Props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M13.2149 14.5827C12.7964 15.071 12.5872 15.3151 12.3382 15.4045C12.1196 15.483 11.8806 15.483 11.662 15.4045C11.413 15.3151 11.2038 15.071 10.7853 14.5827L8.26404 11.6413C7.54365 10.8008 7.18345 10.3806 7.17462 10.0248C7.16695 9.71559 7.3028 9.42024 7.54255 9.22484C7.81843 9 8.3719 9 9.47885 9H14.5213C15.6283 9 16.1818 9 16.4576 9.22484C16.6974 9.42024 16.8332 9.71559 16.8256 10.0248C16.8167 10.3806 16.4565 10.8008 15.7362 11.6413L13.2149 14.5827Z"
      />
    </svg>
  );
};

export default IconCaretDown;
