import {
  Box,
  FlexBox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@montage-ui/core';
import { Fragment } from 'react';

import { Heading2 } from '../layout';
import { sectionLayoutStyle } from '../style';

import { kbdStyle } from './style';

type Props = {
  contents?: Array<SectionAccessibilityProps>;
};

const SectionAccessibility = ({ contents }: Props) => {
  return (
    <FlexBox flexDirection="column" sx={sectionLayoutStyle}>
      <Heading2 content="Accessibility" />

      <SectionAccessibilityTable contents={contents} />
    </FlexBox>
  );
};

const SectionAccessibilityTable = ({ contents }: Props) => {
  return (
    <Table sx={{ borderRadius: 10 }}>
      <TableHead>
        <TableRow>
          <TableHeadCell color="semantic.foreground.neutral.primary">
            Key
          </TableHeadCell>
          <TableHeadCell color="semantic.foreground.neutral.primary">
            Description
          </TableHeadCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {contents?.map(({ keys, description }, i) => (
          <TableRow key={i}>
            <TableCell color="semantic.foreground.neutral.tertiary">
              {keys.map((key, j) => (
                <Fragment key={key}>
                  <Box as="kbd" sx={kbdStyle}>
                    {key}
                  </Box>
                  {j !== keys.length - 1 && ' '}
                </Fragment>
              ))}
            </TableCell>
            <TableCell
              color="semantic.foreground.neutral.secondary"
              variant="label2"
              weight="regular"
            >
              {description.split('\n').map((line, j) => (
                <Fragment key={j}>
                  {line}
                  {j !== description.split('\n').length - 1 && <br />}
                </Fragment>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export { SectionAccessibility, SectionAccessibilityTable };
