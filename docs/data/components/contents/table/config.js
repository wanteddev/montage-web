/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'Table',
      'TableHead',
      'TableHeadCell',
      'TableBody',
      'TableRow',
      'TableCell',
      'Pagination',
      'PaginationSelect',
      'PaginationField',
      'Checkbox',
    ],
    icons: [],
    render: (value) => {
      let pagination = 'null';
      const showCheckbox = value['Content'] === 'Input';

      switch (value['Pagination']) {
        case 'None':
          pagination = 'null';
          break;
        case 'Extended':
          pagination =
            '<Pagination sx={{ width: "100%" }} totalPages={10} leadingContent={<PaginationSelect pageSizeOptions={[10, 20, 50]} />} trailingContent={<PaginationField />} />';
          break;
        case 'Compact':
          pagination = '<Pagination totalPages={10} variant="compact" />';
          break;
        case 'Minimize':
          pagination =
            '<Pagination sx={{ marginRight: "auto" }} totalPages={10} variant="minimize" />';
          break;
      }

      return `
        <Table
          pagination={${pagination}}
          sx={(theme) => ({
            width: '600px',
            maxHeight: '${pagination === 'null' ? '272px' : '276px'}',
            backgroundColor: theme.semantic.background.normal.normal
          })}
        >
          <colgroup>
            ${showCheckbox ? '<col width="36px" /><col width="auto" /><col width="auto" />' : '<col width="50%" /><col width="50%" />'}
          </colgroup>
          <TableHead>
            <TableRow>
              ${showCheckbox ? '<TableHeadCell />' : ''}
              <TableHeadCell>Head</TableHeadCell>
              <TableHeadCell>Head</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              ${showCheckbox ? '<TableCell><Checkbox size="small" /></TableCell>' : ''}
              <TableCell>Cell</TableCell>
              <TableCell>Cell</TableCell>
            </TableRow>
            <TableRow>
              ${showCheckbox ? '<TableCell><Checkbox size="small" /></TableCell>' : ''}
              <TableCell>Cell</TableCell>
              <TableCell>Cell</TableCell>
            </TableRow>
            <TableRow>
              ${showCheckbox ? '<TableCell><Checkbox size="small" /></TableCell>' : ''}
              <TableCell>Cell</TableCell>
              <TableCell>Cell</TableCell>
            </TableRow>
            <TableRow>
              ${showCheckbox ? '<TableCell><Checkbox size="small" /></TableCell>' : ''}
              <TableCell>Cell</TableCell>
              <TableCell>Cell</TableCell>
            </TableRow>
            <TableRow>
              ${showCheckbox ? '<TableCell><Checkbox size="small" /></TableCell>' : ''}
              <TableCell>Cell</TableCell>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      `;
    },
    variants: [
      {
        key: 'Content',
        options: [
          { label: 'Normal', value: {} },
          { label: 'Input', value: {} },
        ],
      },
      {
        key: 'Pagination',
        options: [
          { label: 'None', value: {} },
          { label: 'Extended', value: {} },
          { label: 'Compact', value: {} },
          { label: 'Minimize', value: {} },
        ],
      },
    ],
  },
};
