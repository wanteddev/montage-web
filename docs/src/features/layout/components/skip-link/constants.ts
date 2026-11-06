import { SKIP_TARGET_ID } from '@/features/layout/constants';

export const SKIP_LINKS = [
  { targetId: SKIP_TARGET_ID.mainMenu, label: 'Main menu' },
  {
    targetId: SKIP_TARGET_ID.leftNavigation,
    label: 'Left navigation',
  },
  { targetId: SKIP_TARGET_ID.mainContent, label: 'Main content' },
  {
    targetId: SKIP_TARGET_ID.onThisPage,
    label: 'On this page',
  },
];
