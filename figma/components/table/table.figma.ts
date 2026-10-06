// url=<FIGMA_TABLE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/table/index.tsx
// component=Table

import figma from 'figma';

import { coreImport } from '../../helpers/menu-item';

type InstanceHandle = ReturnType<typeof figma.selectedInstance.findInstance>;

const instance = figma.selectedInstance;

// Head and body cells are all `Cell` layers. Each cell template reports its
// kind through `metadata.props.kind`; body cells are split into rows by the
// number of head cells.
const cells = instance
  .findLayers((layer) => layer.type === 'INSTANCE' && layer.name === 'Cell')
  .filter((layer): layer is InstanceHandle => layer.type === 'INSTANCE')
  .filter((cell) => cell.hasCodeConnect())
  .map((cell) => cell.executeTemplate());
const headCells = cells.filter(
  ({ metadata }) => metadata?.props?.kind === 'head',
);
const bodyCells = cells.filter(
  ({ metadata }) => metadata?.props?.kind === 'body',
);
const columnCount = Math.max(headCells.length, 1);
const bodyRows = Array.from(
  { length: Math.ceil(bodyCells.length / columnCount) },
  (_, index) => bodyCells.slice(index * columnCount, (index + 1) * columnCount),
);

const join = (parts: Array<unknown>, separator: string) =>
  parts.length === 0
    ? ''
    : parts.reduce((joined, part) => figma.tsx`${joined}${separator}${part}`);

const renderRow = (
  row: Array<{ example: unknown }>,
  indent: string,
) => figma.tsx`<TableRow>
${indent}  ${join(
  row.map(({ example }) => example),
  `\n${indent}  `,
)}
${indent}</TableRow>`;

const isInput = instance.getPropertyValue('Content') === 'Input';
const colgroup = isInput
  ? `
  <colgroup>
    <col width="36px" />${'\n    <col width="auto" />'.repeat(columnCount - 1)}
  </colgroup>`
  : '';
const pagination =
  instance.getBoolean('Pagination') === true
    ? figma.properties.children(['Pagination'])
    : undefined;

// Code Connect adds the imports of the direct children (cells, pagination) on
// its own, so re-declaring them would duplicate names across statements. Only
// the pagination's swapped resources (`PaginationSelect` / `PaginationField`)
// are two levels down and must be declared here.
const paginationLayer =
  pagination === undefined ? undefined : instance.findInstance('Pagination');
const paginationResources =
  paginationLayer && paginationLayer.type !== 'ERROR'
    ? [
        ['Leading Content', '┗ Instance'],
        ['Trailing Content', '┗ Instance\u180E'],
      ]
        .filter(([toggle]) => paginationLayer.getBoolean(toggle) === true)
        .map(([, swap]) => paginationLayer.getInstanceSwap(swap))
        .map((resource) =>
          resource && resource.type !== 'ERROR'
            ? resource.codeConnectId()
            : null,
        )
        .filter((id): id is string => Boolean(id))
    : [];

export default {
  id: 'Table',
  imports: [
    coreImport([
      'Table',
      'TableBody',
      'TableHead',
      'TableRow',
      ...paginationResources,
    ]),
  ],
  example: figma.tsx`<Table${figma.helpers.react.renderProp('pagination', pagination)}>${colgroup}
  <TableHead>
    ${renderRow(headCells, '    ')}
  </TableHead>
  <TableBody>
    ${join(
      bodyRows.map((row) => renderRow(row, '    ')),
      '\n    ',
    )}
  </TableBody>
</Table>`,
  metadata: { nestable: true },
};
