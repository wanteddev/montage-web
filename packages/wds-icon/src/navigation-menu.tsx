import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconNavigationMenu = (props: Props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.3333 5H4.66667C4.29848 5 4 5.36563 4 5.81667V6.63333C4 7.08437 4.29848 7.45 4.66667 7.45H19.3333C19.7015 7.45 20 7.08437 20 6.63333V5.81667C20 5.36563 19.7015 5 19.3333 5Z"
        fill="currentColor"
      />
      <path
        d="M19.3333 10.775H4.66667C4.29848 10.775 4 11.1406 4 11.5917V12.4083C4 12.8594 4.29848 13.225 4.66667 13.225H19.3333C19.7015 13.225 20 12.8594 20 12.4083V11.5917C20 11.1406 19.7015 10.775 19.3333 10.775Z"
        fill="currentColor"
      />
      <path
        d="M4.66667 16.55H19.3333C19.7015 16.55 20 16.9156 20 17.3667V18.1833C20 18.6344 19.7015 19 19.3333 19H4.66667C4.29848 19 4 18.6344 4 18.1833V17.3667C4 16.9156 4.29848 16.55 4.66667 16.55Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconNavigationMenu;
