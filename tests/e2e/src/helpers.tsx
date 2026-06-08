import { render } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { ThemeProvider } from '@montage-ui/core';

import type { ReactNode } from 'react';

export const renderWithProvider = (ui: ReactNode) =>
  render(<ThemeProvider>{ui}</ThemeProvider>);

/* ------------------------------------------------------------------ */
/* Counting open overlays                                              */
/* ------------------------------------------------------------------ */

/** Count overlays currently in the "open" state for a given ARIA role. */
export const openCount = (role: string) =>
  document.querySelectorAll(`[role="${role}"][data-status="open"]`).length;

export const openDialogCount = () => openCount('dialog');
export const openAlertCount = () => openCount('alertdialog');
export const openTooltipCount = () => openCount('tooltip');
/** Select renders its menu as role="listbox" only while open. */
export const listboxCount = () =>
  document.querySelectorAll('[role="listbox"]').length;

/* ------------------------------------------------------------------ */
/* Interactions                                                        */
/* ------------------------------------------------------------------ */

export const click = (el: Element | null | undefined) =>
  userEvent.click(el as Element);

export const byTestId = (id: string) =>
  document.querySelector(`[data-testid="${id}"]`);

/**
 * Click the exposed top-left corner of the top-most dimmer. The dialog is
 * centered, so the dimmer center is covered; a corner is a genuine "outside"
 * point. `force` is required because `disableOutsidePointerEvents` makes the
 * dimmer `pointer-events: none` — the real click lands on <html> and radix's
 * document-level listener dismisses the top layer, exactly as for a real user.
 */
export const clickTopDimmer = (dataRole = 'modal-dimmer') => {
  const dimmers = [
    ...document.querySelectorAll(
      `[data-role="${dataRole}"][data-status="open"]`,
    ),
  ];
  const dimmer = dimmers.at(-1);
  if (!dimmer)
    throw new Error(`no open dimmer for ${dataRole} (found ${dimmers.length})`);

  return userEvent.click(dimmer, { force: true, position: { x: 4, y: 4 } });
};

/** Force-click a coordinate-corner of an arbitrary element (outside click). */
export const clickCorner = (el: Element | null | undefined, x = 4, y = 4) =>
  userEvent.click(el as Element, { force: true, position: { x, y } });

/* Count by data-role + open status (modal/popover/etc. share role="dialog"). */
export const openByRole = (dataRole: string) =>
  document.querySelectorAll(`[data-role="${dataRole}"][data-status="open"]`)
    .length;

/** Modals identified by their dimmer (role="dialog" is shared with Popover). */
export const openModalCount = () => openByRole('modal-dimmer');
export const openPopoverCount = () => openByRole('popover-content-wrapper');

/** Hover an element (e.g. a tooltip trigger). */
export const hover = (el: Element | null | undefined) =>
  userEvent.hover(el as Element);
