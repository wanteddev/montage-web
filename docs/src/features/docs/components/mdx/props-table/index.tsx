'use client';
import { IconCircleInfo } from '@wanteddev/wds-icon';
import {
  Box,
  FlexBox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Typography,
} from '@wanteddev/wds';

import { useMDXContext } from '../../../context';
import CodeBlock from '../code-block';

import { defaultValueStyle } from './style';

import type { ComponentDoc } from 'react-docgen-typescript';

type Props = {
  component?: string;
  fallback?: Array<{
    name: string;
    description?: string;
    types: string;
    defaultValue?: string;
    required?: boolean;
  }>;
};

const PropsTable = ({ component, fallback }: Props) => {
  const { propTypes } = useMDXContext();

  const types = propTypes.find((c) => c.displayName === component);

  if (!types && !fallback) {
    return null;
  }

  const propValues = Object.entries(
    types?.props ??
      fallback!.reduce(
        (acc, cur) => ({
          ...acc,
          [Math.random()]: {
            ...cur,
            type: {
              name: cur.types,
            },
          },
        }),
        {} as ComponentDoc['props'],
      ),
  );

  return (
    <Table sx={{ marginBottom: 16 }}>
      <colgroup>
        <col width="auto" />
        <col width="auto" />
        <col width="180px" />
      </colgroup>

      <TableHead>
        <TableRow>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Types</TableHeadCell>
          <TableHeadCell>defaultValue</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {propValues.map(([key, value]) => (
          <TableRow key={key}>
            <TableCell>
              <FlexBox alignItems="center" gap="4px">
                <CodeBlock>
                  {`${value.name}${value.required && value.name !== 'as' ? ' *' : ''}`}
                </CodeBlock>
                {value.description && (
                  <Tooltip>
                    <TooltipTrigger>
                      <IconCircleInfo
                        sx={(theme) => ({
                          color: theme.semantic.label.alternative,
                        })}
                      />
                    </TooltipTrigger>
                    <TooltipContent
                      position="top-center"
                      sx={{ maxWidth: '350px' }}
                    >
                      {value.description}
                    </TooltipContent>
                  </Tooltip>
                )}
              </FlexBox>
            </TableCell>
            <TableCell>
              <Typography
                variant="label2"
                weight="regular"
                color="semantic.accent.background.redOrange"
              >
                {value.type.name}
              </Typography>
            </TableCell>
            <TableCell>
              <Box sx={defaultValueStyle}>
                <CodeBlock>
                  {value.defaultValue?.value?.toString() ?? '-'}
                </CodeBlock>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PropsTable;
