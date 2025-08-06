import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@wanteddev/wds-engine';
import { useComposedRefs } from '@radix-ui/react-compose-refs';

import { FlexBox } from '../flex-box';
import { ScrollArea } from '../scroll-area';
import useResizeObserver from '../../hooks/internal/use-resize-observer';
import { Typography } from '../typography';

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

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
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
  DefaultComponentPropsInternal<TableProps, 'table'>
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
  DefaultComponentPropsInternal<TableHeadProps, 'thead'>
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
  DefaultComponentPropsInternal<TableBodyProps, 'tbody'>
>((props, ref) => {
  return (
    <Box as="tbody" ref={ref} {...props} sx={[tableBodyStyle, props.sx]} />
  );
});

TableBody.displayName = 'TableBody';

const TableFoot = forwardRef<
  HTMLTableSectionElement,
  DefaultComponentPropsInternal<TableFootProps, 'tfoot'>
>((props, ref) => {
  return (
    <Box as="tfoot" ref={ref} {...props} sx={[tableFootStyle, props.sx]} />
  );
});

TableFoot.displayName = 'TableFoot';

const TableRow = forwardRef<
  HTMLTableRowElement,
  DefaultComponentPropsInternal<TableRowProps, 'tr'>
>(({ interaction = false, ...props }, ref) => {
  return (
    <Box
      as="tr"
      ref={ref}
      tabIndex={interaction ? 0 : undefined}
      {...props}
      sx={[tableRowStyle(interaction), props.sx]}
    />
  );
});

TableRow.displayName = 'TableRow';

const TableHeadCell = forwardRef<
  HTMLTableCellElement,
  DefaultComponentPropsInternal<TableHeadCellProps, 'th'>
>((props, ref) => {
  return (
    <Typography
      as="th"
      color="semantic.label.neutral"
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
  DefaultComponentPropsInternal<TableCellProps, 'td'>
>((props, ref) => {
  return (
    <Typography
      as="td"
      color="semantic.label.normal"
      variant="body1"
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

export type {
  TableProps,
  TableBodyProps,
  TableHeadProps,
  TableHeadCellProps,
  TableFootProps,
  TableCellProps,
  TableRowProps,
};
