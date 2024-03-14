import { Button, FlexBox, ScrollArea, Typography } from '@wanteddev/wds';
import { useRef } from 'react';

import type { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Components/Scroll Area',
};

export default meta;

export const Basic = () => {
  return (
    <ScrollArea
      scrollbars="both"
      css={(theme) => ({
        width: '150px',
        height: '80px',
        borderRadius: '10px',
        backgroundColor: theme.palette.background.elevated.alternative,
        border: `1px solid ${theme.palette.line.normal.normal}`,
        padding: '10px',
      })}
    >
      <FlexBox flexDirection="column" gap="4px">
        {Array.from(new Array(10)).map((_, i) => (
          <Typography variant="label2" noWrap key={i}>
            This is Tag {i}, and long content in box container
          </Typography>
        ))}
      </FlexBox>
    </ScrollArea>
  );
};

export const Vertical = () => {
  return (
    <ScrollArea
      scrollbars="vertical"
      css={(theme) => ({
        width: '150px',
        height: '80px',
        borderRadius: '10px',
        backgroundColor: theme.palette.background.elevated.alternative,
        border: `1px solid ${theme.palette.line.normal.normal}`,
        padding: '10px',
      })}
    >
      <FlexBox flexDirection="column" gap="4px">
        {Array.from(new Array(10)).map((_, i) => (
          <Typography variant="label2" key={i}>
            Tag {i}
          </Typography>
        ))}
      </FlexBox>
    </ScrollArea>
  );
};

export const Horizontal = () => {
  return (
    <ScrollArea
      scrollbars="horizontal"
      css={(theme) => ({
        width: '150px',
        height: '80px',
        borderRadius: '10px',
        backgroundColor: theme.palette.background.elevated.alternative,
        border: `1px solid ${theme.palette.line.normal.normal}`,
        padding: '10px',
      })}
    >
      <FlexBox flexDirection="column" gap="4px">
        {Array.from(new Array(2)).map((_, i) => (
          <Typography variant="label2" noWrap key={i}>
            This is Tag {i}, and long content in box container
          </Typography>
        ))}
      </FlexBox>
    </ScrollArea>
  );
};

export const WithScrollIntoView = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <ScrollArea
        css={(theme) => ({
          width: '150px',
          height: '80px',
          borderRadius: '10px',
          backgroundColor: theme.palette.background.elevated.alternative,
          border: `1px solid ${theme.palette.line.normal.normal}`,
          padding: '10px',
        })}
      >
        <FlexBox ref={ref} flexDirection="column" gap="4px">
          {Array.from(new Array(10)).map((_, i) => (
            <Typography variant="label2" key={i}>
              Tag {i}
            </Typography>
          ))}
        </FlexBox>
      </ScrollArea>

      <Button
        size="small"
        variant="outlined"
        color="assistive"
        onClick={() =>
          ref.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
        }
        css={{ marginTop: '10px' }}
      >
        Scroll Into view &gt;&gt; Top
      </Button>
    </>
  );
};

export const Auto = () => {
  return (
    <ScrollArea
      type="auto"
      css={(theme) => ({
        width: '150px',
        height: '80px',
        borderRadius: '10px',
        backgroundColor: theme.palette.background.elevated.alternative,
        border: `1px solid ${theme.palette.line.normal.normal}`,
        padding: '10px',
      })}
    >
      <FlexBox flexDirection="column" gap="4px">
        {Array.from(new Array(10)).map((_, i) => (
          <Typography variant="label2" noWrap key={i}>
            This is Tag {i}, and long content in box container
          </Typography>
        ))}
      </FlexBox>
    </ScrollArea>
  );
};

export const Hover = () => {
  return (
    <ScrollArea
      type="hover"
      css={(theme) => ({
        width: '150px',
        height: '80px',
        borderRadius: '10px',
        backgroundColor: theme.palette.background.elevated.alternative,
        border: `1px solid ${theme.palette.line.normal.normal}`,
        padding: '10px',
      })}
    >
      <FlexBox flexDirection="column" gap="4px">
        {Array.from(new Array(10)).map((_, i) => (
          <Typography variant="label2" noWrap key={i}>
            This is Tag {i}, and long content in box container
          </Typography>
        ))}
      </FlexBox>
    </ScrollArea>
  );
};

export const Always = () => {
  return (
    <ScrollArea
      type="always"
      css={(theme) => ({
        width: '150px',
        height: '80px',
        borderRadius: '10px',
        backgroundColor: theme.palette.background.elevated.alternative,
        border: `1px solid ${theme.palette.line.normal.normal}`,
        padding: '10px',
      })}
    >
      <FlexBox flexDirection="column" gap="4px">
        {Array.from(new Array(2)).map((_, i) => (
          <Typography variant="label2" noWrap key={i}>
            This is Tag {i}, and long content in box container
          </Typography>
        ))}
      </FlexBox>
    </ScrollArea>
  );
};

export const Scroll = () => {
  return (
    <ScrollArea
      type="scroll"
      css={(theme) => ({
        width: '150px',
        height: '80px',
        borderRadius: '10px',
        backgroundColor: theme.palette.background.elevated.alternative,
        border: `1px solid ${theme.palette.line.normal.normal}`,
        padding: '10px',
      })}
    >
      <FlexBox flexDirection="column" gap="4px">
        {Array.from(new Array(10)).map((_, i) => (
          <Typography variant="label2" noWrap key={i}>
            This is Tag {i}, and long content in box container
          </Typography>
        ))}
      </FlexBox>
    </ScrollArea>
  );
};
