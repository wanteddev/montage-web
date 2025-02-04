import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@wanteddev/wds-engine';
import { useComposedRefs } from '@radix-ui/react-compose-refs';

import FlexBox from '../flex-box';
import ScrollArea from '../scroll-area';
import useResizeObserver from '../../hooks/use-resize-observer';
import Typography from '../typography';

import {
  paginationWrapperStyle,
  scrollAreaStyle,
  tableBodyStyle,
  tableCellStyle,
  tableFootStyle,
  tableHeadCellStyle,
  tableHeadStyle,
  tableRowStyle,
  tableStyle,
} from './style';
import { TableProvider, useTableContext } from './contexts';
import { TABLE_HEAD_NAME } from './constants';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type {
  TableBodyProps,
  TableCellProps,
  TableFootProps,
  TableHeadCellProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
} from './types';

const Table = forwardRef<
  HTMLTableElement,
  DefaultComponentProps<TableProps, 'table'>
>(({ pagination, children, viewportRef: originViewportRef, ...props }, ref) => {
  const [isSticky, setIsSticky] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const composedViewportRef = useComposedRefs(viewportRef, originViewportRef);

  const handleResize = useCallback(() => {
    const target = viewportRef.current;

    if (!target) {
      return;
    }

    setIsSticky(target.scrollTop > 0);
  }, []);

  useResizeObserver(viewportRef.current?.firstElementChild, handleResize);

  useEffect(() => {
    const target = viewportRef.current;

    if (!target) {
      return;
    }

    const handleOnScroll = (e: Event) => {
      const eventTarget = e.target as HTMLElement;

      setIsSticky(eventTarget.scrollTop > 0);
    };

    target.addEventListener('scroll', handleOnScroll);

    return () => target.removeEventListener('scroll', handleOnScroll);
  }, [viewportRef]);

  return (
    <FlexBox flexDirection="column" {...props} sx={[tableStyle, props.sx]}>
      <TableProvider isSticky={isSticky}>
        <ScrollArea
          viewportRef={composedViewportRef}
          sx={scrollAreaStyle}
          zIndex={1}
        >
          <Box as="table" ref={ref}>
            {children}
          </Box>
        </ScrollArea>

        {Boolean(pagination) && (
          <FlexBox
            flex="1"
            justifyContent="center"
            data-role="table-pagination"
            sx={paginationWrapperStyle}
          >
            {pagination}
          </FlexBox>
        )}
      </TableProvider>
    </FlexBox>
  );
});

Table.displayName = 'Table';

const TableHead = forwardRef<
  HTMLTableSectionElement,
  DefaultComponentProps<TableHeadProps, 'thead'>
>((props, ref) => {
  const { isSticky } = useTableContext(TABLE_HEAD_NAME);

  return (
    <Box
      as="thead"
      ref={ref}
      {...props}
      sx={[tableHeadStyle(isSticky), props.sx]}
    />
  );
});

TableHead.displayName = TABLE_HEAD_NAME;

const TableBody = forwardRef<
  HTMLTableSectionElement,
  DefaultComponentProps<TableBodyProps, 'tbody'>
>((props, ref) => {
  return (
    <Box as="tbody" ref={ref} {...props} sx={[tableBodyStyle, props.sx]} />
  );
});

TableBody.displayName = 'TableBody';

const TableFoot = forwardRef<
  HTMLTableSectionElement,
  DefaultComponentProps<TableFootProps, 'tfoot'>
>((props, ref) => {
  return (
    <Box as="tfoot" ref={ref} {...props} sx={[tableFootStyle, props.sx]} />
  );
});

TableFoot.displayName = 'TableFoot';

const TableRow = forwardRef<
  HTMLTableRowElement,
  DefaultComponentProps<TableRowProps, 'tr'>
>((props, ref) => {
  return <Box as="tr" ref={ref} {...props} sx={[tableRowStyle, props.sx]} />;
});

TableRow.displayName = 'TableRow';

const TableHeadCell = forwardRef<
  HTMLTableCellElement,
  DefaultComponentProps<TableHeadCellProps, 'th'>
>((props, ref) => {
  return (
    <Typography
      as="th"
      color="palette.label.neutral"
      variant="label2"
      weight="bold"
      align="left"
      ref={ref}
      {...props}
      sx={[tableHeadCellStyle, props.sx]}
    />
  );
});

TableHeadCell.displayName = 'TableHeadCell';

const TableCell = forwardRef<
  HTMLTableCellElement,
  DefaultComponentProps<TableCellProps, 'td'>
>((props, ref) => {
  return (
    <Typography
      as="td"
      color="palette.label.normal"
      variant="body1_normal"
      weight="regular"
      align="left"
      ref={ref}
      {...props}
      sx={[tableCellStyle, props.sx]}
    />
  );
});

TableCell.displayName = 'TableCell';

export {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableFoot,
  TableCell,
  TableRow,
};
