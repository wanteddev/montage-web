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
} from '@wanteddev/wds';

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
        '--wds-table-border-color': theme.semantic.line.normal.neutral,
      })}
    >
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
        {fallback.map(
          ({ name, type, defaultValue, description, isOptional = true }) => (
            <TableRow key={name}>
              <TableCell>
                <FlexBox alignItems="center" gap="4px">
                  <CodeBlock>
                    {`${name}${!isOptional && name !== 'as' ? ' *' : ''}`}
                  </CodeBlock>
                  {description && (
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
                        {description}
                      </TooltipContent>
                    </Tooltip>
                  )}
                </FlexBox>
              </TableCell>
              <TableCell>
                <code data-role="property-type">{type}</code>
                <Box
                  aria-hidden
                  sx={{ width: 0, height: 0, overflow: 'hidden' }}
                >
                  {description}
                </Box>
              </TableCell>
              <TableCell>
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
