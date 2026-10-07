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
 * point. The dimmer opts back into pointer events under
 * `disableOutsidePointerEvents` (so consumer `onClick` handlers fire); the
 * pointerdown is still outside the layer, so radix's document-level listener
 * dismisses the top layer. `force` only skips actionability checks for the
 * corner position.
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

/** Press Escape on the currently focused element (radix listens on document). */
export const pressEscape = () => userEvent.keyboard('{Escape}');

/** Right-click the exposed top-left corner of the top-most dimmer. */
export const rightClickTopDimmer = (dataRole = 'modal-dimmer') => {
  const dimmer = [
    ...document.querySelectorAll(
      `[data-role="${dataRole}"][data-status="open"]`,
    ),
  ].at(-1);
  if (!dimmer) throw new Error(`no open dimmer for ${dataRole}`);

  return userEvent.click(dimmer, {
    force: true,
    button: 'right',
    position: { x: 4, y: 4 },
  });
};

/** Computed `pointer-events` of <body> (radix sets `none` for blocking layers). */
export const bodyPointerEvents = () =>
  getComputedStyle(document.body).pointerEvents;

/** Elements hidden from AT by `aria-hidden` (hideOthers marks them). */
export const ariaHiddenOthersCount = () =>
  document.querySelectorAll('[data-aria-hidden]').length;

/** Popover open count by a marker test id on its content. */
export const popoverOpenByTestId = (testid: string) =>
  [...document.querySelectorAll(`[data-testid="${testid}"]`)].filter((el) =>
    el.closest('[data-status="open"]'),
  ).length;

/**
 * Number of mounted nodes matching `selector`, regardless of open/close status.
 * A closing layer stays in the radix layer stack until its exit animation
 * unmounts it — and while mounted it is still the top layer that receives
 * Escape. Wait for this to hit 0 before the next Escape.
 */
export const mountedCount = (selector: string) =>
  document.querySelectorAll(selector).length;
