import { run } from 'eslint-vitest-rule-tester';

import segmentedControlItemUsesNameRule from '.';

run({
  name: 'segmented-control-item-uses-name',
  rule: segmentedControlItemUsesNameRule,

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  valid: [
    {
      code: `
        import { SegmentedControl, SegmentedControlItem } from '@montage-ui/core';

        <SegmentedControl iconOnly defaultValue="0">
          <SegmentedControlItem value="0" aria-label="Board view" />
          <SegmentedControlItem value="1" aria-label="List view" />
        </SegmentedControl>
      `,
    },
    {
      code: `
        import { SegmentedControl, SegmentedControlItem } from '@montage-ui/core';

        <SegmentedControl iconOnly defaultValue="0">
          <SegmentedControlItem value="0" aria-labelledby="board-label" />
        </SegmentedControl>
      `,
    },
    {
      // not iconOnly — the item text provides the accessible name
      code: `
        import { SegmentedControl, SegmentedControlItem } from '@montage-ui/core';

        <SegmentedControl defaultValue="0">
          <SegmentedControlItem value="0">Board</SegmentedControlItem>
        </SegmentedControl>
      `,
    },
    {
      code: `
        import { SegmentedControl, SegmentedControlItem } from '@montage-ui/core';

        <SegmentedControl iconOnly={false} defaultValue="0">
          <SegmentedControlItem value="0">Board</SegmentedControlItem>
        </SegmentedControl>
      `,
    },
    {
      // dynamic iconOnly value — not statically knowable, skip
      code: `
        import { SegmentedControl, SegmentedControlItem } from '@montage-ui/core';

        <SegmentedControl iconOnly={props.iconOnly} defaultValue="0">
          <SegmentedControlItem value="0">Board</SegmentedControlItem>
        </SegmentedControl>
      `,
    },
    {
      // item outside any SegmentedControl (composed elsewhere) — out of scope
      code: `
        import { SegmentedControlItem } from '@montage-ui/core';

        <SegmentedControlItem value="0" />
      `,
    },
    {
      // non-montage components with the same names
      code: `
        import { SegmentedControl, SegmentedControlItem } from 'other-library';

        <SegmentedControl iconOnly defaultValue="0">
          <SegmentedControlItem value="0" />
        </SegmentedControl>
      `,
    },
    {
      // map-rendered items with aria-label
      code: `
        import { SegmentedControl, SegmentedControlItem } from '@montage-ui/core';

        <SegmentedControl iconOnly defaultValue="0">
          {items.map((item) => (
            <SegmentedControlItem key={item.value} value={item.value} aria-label={item.label} />
          ))}
        </SegmentedControl>
      `,
    },
  ],
  invalid: [
    {
      code: `
        import { SegmentedControl, SegmentedControlItem } from '@montage-ui/core';

        <SegmentedControl iconOnly defaultValue="0">
          <SegmentedControlItem value="0" />
          <SegmentedControlItem value="1" />
        </SegmentedControl>
      `,
      errors: 2,
    },
    {
      code: `
        import * as montage from '@montage-ui/core';

        <montage.SegmentedControl iconOnly defaultValue="0">
          <montage.SegmentedControlItem value="0" />
        </montage.SegmentedControl>
      `,
      errors: 1,
    },
    {
      // aliased import
      code: `
        import { SegmentedControl as Control, SegmentedControlItem as Item } from '@montage-ui/core';

        <Control iconOnly defaultValue="0">
          <Item value="0" />
        </Control>
      `,
      errors: 1,
    },
    {
      // map-rendered items without aria-label are still inside the iconOnly root
      code: `
        import { SegmentedControl, SegmentedControlItem } from '@montage-ui/core';

        <SegmentedControl iconOnly defaultValue="0">
          {items.map((item) => (
            <SegmentedControlItem key={item.value} value={item.value} />
          ))}
        </SegmentedControl>
      `,
      errors: 1,
    },
    {
      code: `
        import { SegmentedControl, SegmentedControlItem } from '@montage-ui/core';

        <SegmentedControl iconOnly={true} defaultValue="0">
          <SegmentedControlItem value="0" />
        </SegmentedControl>
      `,
      errors: 1,
    },
  ],
});
