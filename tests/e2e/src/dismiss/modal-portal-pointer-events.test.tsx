import { cleanup } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import {
  Autocomplete,
  AutocompleteField,
  AutocompleteList,
  AutocompleteOption,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalHeading,
  Portal,
} from '@montage-ui/core';

import {
  byTestId,
  click,
  clickTopDimmer,
  openModalCount,
  renderWithProvider,
} from '../helpers';

import type { ReactNode } from 'react';

/*
 * An open (dimmed) Modal sets `pointer-events: none` on <body> and re-enables
 * only radix layers. Anything else portaled to <body> inherits `none` through
 * the DOM — React-tree membership does not help CSS inheritance. These cases
 * pin down what keeps working, what a consumer must opt into, and the escape
 * hatch for DOM that is not rendered through React.
 */

const appended: Array<HTMLElement> = [];

afterEach(() => {
  cleanup();
  appended.splice(0).forEach((el) => el.remove());
});

const OpenModal = ({ children }: { children: ReactNode }) => (
  <Modal defaultOpen>
    <ModalContainer variant="popup">
      <ModalContent>
        <ModalContentItem>
          <ModalHeading>Modal</ModalHeading>
          {children}
        </ModalContentItem>
      </ModalContent>
    </ModalContainer>
  </Modal>
);

const bodyPointerEvents = () => document.body.style.pointerEvents;

describe('Portaled content inside an open modal', () => {
  it('lets the mouse pick an Autocomplete option (PopperContent opts back in)', async () => {
    renderWithProvider(
      <OpenModal>
        <Autocomplete>
          <AutocompleteField>
            <input data-testid="autocomplete-field" />
          </AutocompleteField>
          <AutocompleteList>
            <AutocompleteOption value="apple" data-testid="option-apple">
              Apple
            </AutocompleteOption>
            <AutocompleteOption value="banana" data-testid="option-banana">
              Banana
            </AutocompleteOption>
          </AutocompleteList>
        </Autocomplete>
      </OpenModal>,
    );

    await expect.poll(openModalCount).toBe(1);
    expect(bodyPointerEvents()).toBe('none');

    await click(byTestId('autocomplete-field'));
    await expect.poll(() => byTestId('option-banana')).not.toBeNull();

    // A real (non-forced) click: fails the actionability check if the option
    // does not receive pointer events.
    await click(byTestId('option-banana'));

    await expect
      .poll(() => (byTestId('autocomplete-field') as HTMLInputElement).value)
      .toBe('banana');
    // The option is inside the modal's React tree — not an outside click.
    expect(openModalCount()).toBe(1);
  });

  it('blocks a consumer Portal that does not opt back in', async () => {
    const onClick = vi.fn();

    renderWithProvider(
      <OpenModal>
        <Portal>
          <button
            type="button"
            data-testid="portaled-button"
            style={{ position: 'fixed', top: 40, right: 40, zIndex: 2000 }}
            onClick={onClick}
          >
            Portaled
          </button>
        </Portal>
      </OpenModal>,
    );

    await expect.poll(openModalCount).toBe(1);

    // `force` skips actionability; the real click lands on <html> because the
    // button inherits `pointer-events: none` from <body>.
    await userEvent.click(byTestId('portaled-button') as Element, {
      force: true,
    });

    expect(onClick).not.toHaveBeenCalled();
  });

  it('works for a consumer Portal with `pointer-events: auto` and keeps the modal open', async () => {
    const onClick = vi.fn();

    renderWithProvider(
      <OpenModal>
        <Portal>
          <button
            type="button"
            data-testid="portaled-button"
            style={{
              position: 'fixed',
              top: 40,
              right: 40,
              // Above the modal (theme.zIndex.modal) so it is not covered.
              zIndex: 2000,
              pointerEvents: 'auto',
            }}
            onClick={onClick}
          >
            Portaled
          </button>
        </Portal>
      </OpenModal>,
    );

    await expect.poll(openModalCount).toBe(1);

    await click(byTestId('portaled-button'));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(openModalCount()).toBe(1);

    await clickTopDimmer('modal-dimmer');
    await expect.poll(openModalCount).toBe(0);
    expect(bodyPointerEvents()).toBe('');
  });

  describe('DOM appended outside React (vanilla widget)', () => {
    const appendWidget = (attrs: Record<string, string> = {}) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = 'Widget';
      button.dataset.testid = 'vanilla-widget';
      Object.assign(button.style, {
        position: 'fixed',
        top: '40px',
        right: '40px',
        zIndex: '2000',
        pointerEvents: 'auto',
      });
      Object.entries(attrs).forEach(([k, v]) => button.setAttribute(k, v));
      document.body.appendChild(button);
      appended.push(button);
      return button;
    };

    it('counts as an outside click even with `pointer-events: auto`', async () => {
      renderWithProvider(<OpenModal>content</OpenModal>);
      await expect.poll(openModalCount).toBe(1);

      const onClick = vi.fn();
      appendWidget().addEventListener('click', onClick);

      await click(byTestId('vanilla-widget'));

      expect(onClick).toHaveBeenCalledTimes(1);
      // Not part of the modal's React tree → dismisses the modal.
      await expect.poll(openModalCount).toBe(0);
    });

    it('keeps the modal open when marked with data-ignore-dismissable-layer', async () => {
      renderWithProvider(<OpenModal>content</OpenModal>);
      await expect.poll(openModalCount).toBe(1);

      const onClick = vi.fn();
      appendWidget({
        'data-ignore-dismissable-layer': 'true',
      }).addEventListener('click', onClick);

      await click(byTestId('vanilla-widget'));

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(openModalCount()).toBe(1);
    });
  });
});
