/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['ActionArea', 'ActionAreaButton'],
    icons: ['IconRefresh'],
    variants: [
      {
        key: 'Variants',
        options: [
          {
            label: 'Strong',
            value: {
              variant: 'strong',
              sx: (theme) => ({
                width: '90%',
                backgroundColor: theme.semantic.background.normal.normal,
              }),
            },
          },
          {
            label: 'Neutral',
            value: {
              variant: 'neutral',
              sx: (theme) => ({
                width: '90%',
                backgroundColor: theme.semantic.background.normal.normal,
                '[data-role="action-area-wrapper"]': {
                  flexDirection: 'row-reverse',
                },
              }),
            },
          },
          {
            label: 'Compact',
            value: {
              variant: 'compact',
              sx: (theme) => ({
                width: '90%',
                backgroundColor: theme.semantic.background.normal.normal,
                '[data-role="action-area-wrapper"]': {
                  flexDirection: 'row-reverse',
                },
              }),
            },
          },
          {
            label: 'Cancel',
            value: {
              variant: 'cancel',
              children: '<ActionAreaButton>Cancel</ActionAreaButton>',
              sx: (theme) => ({
                width: '90%',
                backgroundColor: theme.semantic.background.normal.normal,
              }),
            },
          },
        ],
      },
      {
        key: 'Combination',
        disabled: (value) => value['Variants'] === 'Cancel',
        options: [
          {
            label: 'With alternative action',
            value: {
              children:
                '<><ActionAreaButton>Main action</ActionAreaButton><ActionAreaButton variant="alternative">Alternative</ActionAreaButton></>',
            },
          },
          {
            label: 'With sub action',
            value: {
              children:
                '<><ActionAreaButton>Main action</ActionAreaButton><ActionAreaButton variant="sub">Sub action</ActionAreaButton></>',
            },
          },
          {
            label: 'Main only',
            value: {
              children: '<ActionAreaButton>Main action</ActionAreaButton>',
            },
          },
        ],
      },
      {
        key: 'Sub button option',
        disabled: (value) =>
          value['Combination'] !== 'With sub action' ||
          value['Variants'] !== 'Neutral',
        options: [
          {
            label: 'Label',
            value: {
              children:
                '<><ActionAreaButton>Main action</ActionAreaButton><ActionAreaButton variant="sub">Alternative</ActionAreaButton></>',
            },
          },
          {
            label: 'With icon',
            value: {
              children:
                '<><ActionAreaButton>Main action</ActionAreaButton><ActionAreaButton variant="sub" iconOnly><IconRefresh/></ActionAreaButton></>',
            },
          },
        ],
      },
    ],
  },
};
