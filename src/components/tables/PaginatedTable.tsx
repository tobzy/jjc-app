import React, { useMemo,useState } from 'react';
import styled from 'styled-components';
import {
  Cell,
  Column,
  HeaderGroup,
  Row,
  usePagination,
  useTable,
  useSortBy,
  TableState,
  TableOptions, TableInstance
} from 'react-table';
import { LoadingOverlay } from '@mantine/core';
import { ChevronDownIcon, ChevronUpIcon } from '@modulz/radix-icons';
import Table from './Table';
import {LocationDetailsModal} from "../modals/LocationDetailsModal";
import {Location} from "../../services/location-service";
// import searchIcon from '../../assets/images/icons/search.svg';
// import filterIcon from '../../assets/images/icons/filter.svg';
// import exportIcon from '../../assets/images/icons/export.svg';

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Totals = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary.grey};
`;

const Controls = styled.div`
  text-align: end;
`;

const Control = styled.img`
  height: 24px;
  width: 24px;
  margin-left: 24px;
`;

const StyledTableHead = styled(Table.Head)`
  background-color: ${({ theme }) => theme.colors.primary.lightgrey};
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary.darkgrey};
`;

const StyledTableHeader = styled(Table.TH)`
  padding: 16px 10px;
  text-align: start;

  &:last-child {
    text-align: end;
  }
`;

const StyledTableBody = styled(Table.Body)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary.darkgrey};
`;

const StyledCell = styled(Table.TD)`
  padding: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
`;

const Pagination = styled.div`
  text-align: end;
  margin-top: 10px;
  & span {
    font-size: 14px;
  }
`;

const defaultPropGetter = () => ({});

function TableHeader<R extends object>({
  className,
  headerGroups,
}: {
  className?: string;
  headerGroups: HeaderGroup<R>[];
}) {
  return (
    <StyledTableHead className={className}>
      {headerGroups.map((headerGroup) => (
        <Table.TR {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <StyledTableHeader {...column.getHeaderProps()}>{column.render('Header')}</StyledTableHeader>
          ))}
        </Table.TR>
      ))}
    </StyledTableHead>
  );
}

function TableRow<R extends object>({
  className,
  row,
  getColumnProps,
  getCellProps,
  onRowClick
}: {
  className?: string;
  onRowClick?: (data:Location) => void;
  row: Row<R>;
  getColumnProps: (col: Column<R>) => object;
  getCellProps: (cell: Cell<R>) => object;
}) {


  const data = row.original as Location
  return (
    <Table.TR className={className} {...row.getRowProps()} onClick={() => onRowClick?.(data)} >
      {row.cells.map((cell) => (
        <StyledCell {...cell.getCellProps([getColumnProps(cell.column), getCellProps(cell)])}>
          {cell.render('Cell')}
        </StyledCell>
      ))}
    </Table.TR>
  );
}

function TableBody<R extends object>({
  className,
  page,
  prepareRow,
  getColumnProps,
  getCellProps,
  ...tableBodyProps
}: {
  className?: string;
  page: Row<R>[];
  prepareRow: (row: Row<R>) => void;
  getColumnProps: (col: Column<R>) => object;
  getCellProps: (cell: Cell<R>) => object;
}) {

  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Location | null>(null);

  const showDetailsModal = (data:Location) => {
    setIsDetailsModalVisible(true)
    setSelectedRow(data)
  };

  return (
    <>
      <StyledTableBody className={className} {...tableBodyProps}>
        {page.map((row, i) => {
          prepareRow(row);
          return <TableRow key={i} {...{ row, getColumnProps, getCellProps }} onRowClick={showDetailsModal} className={'cursor-pointer'} />;
        })}
      </StyledTableBody>
      <LocationDetailsModal
        data={selectedRow as Location}
        hide={() => setIsDetailsModalVisible(false)}
        isVisible={isDetailsModalVisible && Boolean(selectedRow)}
        key={selectedRow?.id}
      />
    </>

  );
}

function EventedButton({
  className,
  text,
  callback,
  disabled,
}: {
  className?: string;
  text: string;
  callback: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}): JSX.Element {
  function handleClick(e:any) {
    e.preventDefault();
    if (!disabled) {
      callback(e);
    }
  }
  return (
    <button aria-disabled={disabled} className={className} type="button" onClick={handleClick}>
      {text}
    </button>
  );
}

const TextButton = styled(EventedButton)`
  background: none;
  border: none;
  padding: 0 4px;
  font-family: 'Glacial Indifference-Regular', sans-serif;
  font-weight: 600;
  color: ${({ theme, disabled }) => (disabled ? theme.colors.secondary.grey : theme.colors.primary.grey)};
  text-decoration: none;
  cursor: pointer;
  margin-right: 10px;
`;

export const LocationsTable = <R extends object>({
  className,
  columnConfig,
  hideFilters = false,
  loading = false,
  isPreviousData = false,
  totalPages,
  getColumnProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
  rowData,
  hidePagination = false,
  hideTotal = false,
  queryPageSize,
  queryPageIndex,
  setQueryPageIndex,
  setQueryPageSize,
  totalItems,
}: {
  className?: string;
  walletId?: string;
  hideFilters?: boolean;
  loading?: boolean;
  isPreviousData?: boolean;
  hidePagination?: boolean;
  hideTotal?: boolean;
  totalPages: number;
  totalItems?: number;
  queryPageIndex: number;
  queryPageSize: number;
  rowData: R[];
  columnConfig: Column<R>[];
  getColumnProps?: (col: Column<R>) => object;
  getCellProps?: (cell: Cell<R>) => object;
  setQueryPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setQueryPageSize: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element => {
  const useControlledState = (state:TableState<R>) =>
    useMemo(
      () => ({
        ...state,
        pageIndex: queryPageIndex,
        pageSize: queryPageSize,
      }),
      [state, queryPageIndex, queryPageSize],
    );

  // const columns = React.useMemo(() => columnConfig, []);
  const columns = columnConfig;

  const tableInstance = useTable<R>(
    {
      columns,
      data: rowData,
      useControlledState,
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: totalPages,
      setQueryPageIndex,
      setQueryPageSize,
      defaultCanSort: true,
    } as TableOptions<R>,
    useSortBy,
    usePagination,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex, pageSize },
    setQueryPageIndex: setPageIndex,
  } = tableInstance as any;

  return (
    <TableWrapper>
      <LoadingOverlay visible={loading} zIndex={5} />

      <Header>
        {!hideTotal && (
          <Totals>
            {totalItems || 0} Total Locations
          </Totals>
        )}

        {/*{!hideFilters && (*/}
        {/*  <Controls>*/}
        {/*    /!* TODO: Add search and filter capability *!/*/}
        {/*    <Control src={searchIcon} alt="Search" />*/}
        {/*    <Control src={filterIcon} alt="Filter" />*/}
        {/*    <Control src={exportIcon} alt="Export" />*/}
        {/*  </Controls>*/}
        {/*)}*/}
      </Header>
      <TableContainer>
        <Table className={className} {...{ ...getTableProps() }}>
          <TableHeader className={className} {...{ headerGroups }} />
          <TableBody
            className={className}
            {...{ page, prepareRow, getColumnProps, getCellProps, ...getTableBodyProps() }}
          />
        </Table>
      </TableContainer>

      {Boolean(pageOptions.length) && !hidePagination && (
        <Pagination>
          <div className="pagination">
            <TextButton
              callback={() => setPageIndex((old:number) => Math.max(old - 1, 0))}
              disabled={pageIndex === 0 || !canPreviousPage}
              text="<"
            />

            <TextButton
              callback={() => {
                if (!isPreviousData) {
                  setPageIndex((old:number) => old + 1);
                }
              }}
              disabled={!canNextPage}
              text=">"
            />

            <span>
              Page {" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
          </div>
        </Pagination>
      )}
    </TableWrapper>
  );
};

const TableContainer = styled.div`
  display: inline-block;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
`;
