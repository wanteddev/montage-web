import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconDownload = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.09985 19.1V15.1H4.89985V19.1C4.89985 19.1552 4.94462 19.2 4.99985 19.2H18.9999C19.0551 19.2 19.0999 19.1552 19.0999 19.1V15.1H20.8999V19.1C20.8999 20.1493 20.0492 21 18.9999 21H4.99985C3.95051 21 3.09985 20.1493 3.09985 19.1Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.34625 10.9013C7.68795 10.5403 8.25758 10.5247 8.61856 10.8664L12.1199 14.1807L15.6211 10.8664C15.9821 10.5247 16.5518 10.5403 16.8935 10.9013C17.2352 11.2623 17.2195 11.8319 16.8586 12.1736L12.7386 16.0736C12.3915 16.4021 11.8482 16.4021 11.5011 16.0736L7.38115 12.1736C7.02017 11.8319 7.00454 11.2623 7.34625 10.9013Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 3C12.4969 3 12.8999 3.40294 12.8999 3.9V14.42C12.8999 14.9171 12.4969 15.32 11.9999 15.32C11.5028 15.32 11.0999 14.9171 11.0999 14.42V3.9C11.0999 3.40294 11.5028 3 11.9999 3Z"
      />
    </svg>
  );
};

export default IconDownload;
