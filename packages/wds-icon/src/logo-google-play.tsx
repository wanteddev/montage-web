import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconLogoGooglePlay = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M15.7178 7.72438L7.22945 2.80299C6.91167 2.61085 6.53478 2.5 6.12832 2.5C5.29879 2.5 4.57981 2.97902 4.22903 3.67049L12.0034 11.4407L15.7178 7.72438Z"
      />
      <path
        fill="currentColor"
        d="M4.0008 4.57346C4.00027 4.59165 4 4.60997 4 4.62842V19.3865C4 19.407 4.00025 19.4273 4.00077 19.4475L11.4378 12.0066L4.0008 4.57346Z"
      />
      <path
        fill="currentColor"
        d="M4.23536 20.3445C4.5884 21.032 5.30375 21.5001 6.12832 21.5001C6.52 21.5001 6.8895 21.3966 7.20728 21.2045L7.22945 21.1897L15.7237 16.2903L12.0037 12.5721L4.23536 20.3445Z"
      />
      <path
        fill="currentColor"
        d="M16.4487 15.8837L19.8961 13.8956C20.5613 13.5335 21.0121 12.8314 21.0121 12.0259C21.0121 11.2204 20.5686 10.5183 19.9035 10.1636V10.1562H19.8961L16.4333 8.14012L12.5692 12.0063L16.4487 15.8837Z"
      />
    </svg>
  );
};

export default IconLogoGooglePlay;
