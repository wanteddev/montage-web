'use client';
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
} from '@montage-ui/core';
import { IconCircleInfo } from '@montage-ui/icon';

import CellContent from '../cell-content';
import CodeBlock from '../code-block';

import { defaultValueStyle } from './style';

import type { ComponentInfo } from '@/features/docs/types';

type Props = {
  component?: string;
  fallback?: ComponentInfo['props'];
};

const PropsTable = ({ component, fallback }: Props) => {
  if (!fallback) {
    return null;
  }

  return (
    <Table
      aria-label={`${component} props`}
      sx={(theme) => ({
        marginBottom: 40,
        '--table-border-color': theme.semantic.line.neutral.secondary,
        'th, td': { overflowWrap: 'normal' },
      })}
    >
      <TableHead>
        <TableRow>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Types</TableHeadCell>
          <TableHeadCell>defaultValue</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {fallback.map(
          ({ name, type, defaultValue, description, isOptional = true }) => (
            <TableRow key={name}>
              <TableCell>
                <FlexBox alignItems="center" gap="4px">
                  <CodeBlock
                    sx={{
                      wordBreak: 'keep-all',
                      overflowWrap: 'initial',
                    }}
                  >
                    {`${name}${!isOptional && name !== 'as' ? ' *' : ''}`}
                  </CodeBlock>
                  {description && (
                    <Tooltip>
                      <TooltipTrigger>
                        <IconCircleInfo
                          sx={(theme) => ({
                            flexShrink: 0,
                            color: theme.semantic.foreground.neutral.tertiary,
                          })}
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        position="top-center"
                        sx={{ maxWidth: '350px' }}
                      >
                        {description}
                      </TooltipContent>
                    </Tooltip>
                  )}
                </FlexBox>
              </TableCell>
              <TableCell>
                <CellContent>
                  <code data-role="property-type">{type}</code>
                </CellContent>
                <Box
                  aria-hidden
                  sx={{ width: 0, height: 0, overflow: 'hidden' }}
                >
                  {description}
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  wordBreak: 'keep-all',
                  overflowWrap: 'initial',
                }}
              >
                <Box sx={defaultValueStyle}>
                  <CodeBlock>{defaultValue?.toString() ?? '-'}</CodeBlock>
                </Box>
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
};

export default PropsTable;
