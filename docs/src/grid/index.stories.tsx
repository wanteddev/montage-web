import { Grid, GridItem } from '@wanteddev/wds';

import type { PropsWithChildren } from 'react';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Grid> = {
  component: Grid,
  title: 'Components/Grid',
};

const Item = ({ children }: PropsWithChildren) => (
  <div
    css={(theme) => ({
      padding: '8px',
      border: `1px solid ${theme.palette.line.solid.normal}`,
      backgroundColor: theme.palette.background.normal.normal,
      color: theme.palette.label.normal,
    })}
  >
    {children}
  </div>
);

export default meta;

export const Basic = () => {
  return (
    <Grid spacing={20}>
      <GridItem columns={10}>
        <Item>columns=10</Item>
      </GridItem>
      <GridItem columns={2}>
        <Item>columns=2</Item>
      </GridItem>

      <GridItem columns>
        <Item>columns=true</Item>
      </GridItem>
      <GridItem columns="auto">
        <Item>columns=auto</Item>
      </GridItem>
      <GridItem columns={6}>
        <Item>columns=6</Item>
      </GridItem>
    </Grid>
  );
};
