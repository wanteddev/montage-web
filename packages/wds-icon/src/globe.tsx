import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const IconGlobe = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.9999 9.9001H3.99985V8.1001H19.9999V9.9001Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.9999 15.9001H3.99985V14.1001H19.9999V15.9001Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7746 21.533C5.01276 13.6913 8.38666 5.54556 10.7887 2.44852L12.211 3.55167C10.0853 6.29247 7.12037 13.5197 12.2251 20.4672L10.7746 21.533Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.2251 2.4672C18.9869 10.3089 15.613 18.4546 13.211 21.5517L11.7887 20.4485C13.9144 17.7077 16.8793 10.4805 11.7746 3.533L13.2251 2.4672Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 3.9001C7.52635 3.9001 3.89985 7.52659 3.89985 12.0001C3.89985 16.4736 7.52635 20.1001 11.9999 20.1001C16.4734 20.1001 20.0999 16.4736 20.0999 12.0001C20.0999 7.52659 16.4734 3.9001 11.9999 3.9001ZM2.09985 12.0001C2.09985 6.53248 6.53223 2.1001 11.9999 2.1001C17.4675 2.1001 21.8999 6.53248 21.8999 12.0001C21.8999 17.4677 17.4675 21.9001 11.9999 21.9001C6.53223 21.9001 2.09985 17.4677 2.09985 12.0001Z"
      />
    </svg>
  );
};

export default IconGlobe;
