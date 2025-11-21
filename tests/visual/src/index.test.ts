import { createElement } from 'react';
import { describe, expect, it } from 'vitest';

import { renderWithProvider } from './helpers';

// @ts-expect-error
const fixtureModules = import.meta.glob('./fixtures/*.tsx', {
  eager: true,
}) as Record<string, Record<string, React.ComponentType>>;

describe('Visual Regression Tests', () => {
  Object.entries(fixtureModules).forEach(([filePath, module]) => {
    const fileName =
      filePath.split('/').pop()?.replace('.tsx', '') || 'unknown';

    describe(fileName, () => {
      Object.entries(module).forEach(([exportName, Component]) => {
        if (exportName === 'default' || typeof Component !== 'function') {
          return;
        }

        it(`should render ${exportName}`, async () => {
          const { container, unmount } = renderWithProvider(
            createElement(Component),
          );

          expect(container).toBeInTheDocument();

          await expect(container).toMatchScreenshot(
            `${fileName}/${exportName}`,
          );

          unmount();
        });
      });
    });
  });
});
