import { redirect } from 'next/navigation';

const RootPage = () => {
  redirect('/docs/overview/getting-started');

  return null;
};

export default RootPage;
