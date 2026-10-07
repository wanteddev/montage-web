import { theme } from '@montage-ui/engine';

import { listCellStyle } from './style';

const stylesOf = (props: Parameters<typeof listCellStyle>[0]) =>
  listCellStyle(props)(theme.light as never).styles;

describe('listCellStyle', () => {
  it('should show a pointer cursor on an interactive cell', () => {
    expect(stylesOf({})).toMatch(/cursor:\s*pointer/);
  });

  it('should not show a pointer cursor on a disabled or non-interactive cell', () => {
    expect(stylesOf({ disabled: true })).not.toMatch(/cursor:\s*pointer/);
    expect(stylesOf({ disableInteraction: true })).not.toMatch(
      /cursor:\s*pointer/,
    );
  });
});
