import { SKIP_TARGET_ID } from '@/features/layout/constants';

export const SKIP_LINKS = [
  { targetId: SKIP_TARGET_ID.topNavigation, label: 'Top Navigation' },
  {
    targetId: SKIP_TARGET_ID.leftNavigation,
    label: 'Left Navigation',
  },
  { targetId: SKIP_TARGET_ID.mainContent, label: 'Main Content' },
  {
    targetId: SKIP_TARGET_ID.onThisPage,
    label: 'On this page',
  },
];
