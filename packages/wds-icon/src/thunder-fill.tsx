import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconThunderFill = (props: Props) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.3628 2.06299C14.7226 2.20512 14.9513 2.5613 14.9309 2.94763L14.584 9.50005H18.3998C18.7572 9.50005 19.0807 9.71152 19.2241 10.0389C19.3675 10.3662 19.3037 10.7474 19.0614 11.0102L9.13493 21.7749C8.8658 22.0667 8.43722 22.1478 8.0801 21.9743C7.72299 21.8009 7.5217 21.4139 7.5847 21.0219L8.60828 14.653H4.89977C4.54977 14.653 4.23152 14.4501 4.08383 14.1328C3.93613 13.8155 3.98579 13.4413 4.21113 13.1735L13.3435 2.32058C13.5926 2.02457 14.003 1.92085 14.3628 2.06299Z"
      />
    </svg>
  );
};

export default IconThunderFill;
