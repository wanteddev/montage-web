'use client';
import { usePathname } from 'next/navigation';

import LnbMobile from '@/features/docs/components/lnb/mobile';
import Gnb from '@/features/layout/components/gnb';

const ConditionalChrome = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/preview/')) return null;

  return (
    <>
      <LnbMobile />
      <Gnb />
    </>
  );
};

export default ConditionalChrome;
