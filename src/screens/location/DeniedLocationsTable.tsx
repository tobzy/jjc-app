import styled from 'styled-components';
import { LoadingOverlay } from '@mantine/core';
import { Column } from 'react-table';
import { useState } from 'react';
import { Location } from '../../services/location-service';
import {columnConfig, LocationRow} from '../location/table-config';
import { useGetLocations } from '../../hooks/useMapping';
import { LocationsTable } from '../../components/tables/PaginatedTable';

const Wrapper = styled.div`
  margin-top: 24px;
`;

export const DeniedLocationsTable = (): JSX.Element => {
  const [queryPageIndex, setQueryPageIndex] = useState(1);
  const [queryPageSize, setQueryPageSize] = useState(10);

  const {
    data:locationData = {} as any,
    isLoading: isLoadingLocations,
    isError,
    error,
    isFetching,
    isPreviousData,
  } = useGetLocations(queryPageIndex, queryPageSize, 'denied');

  const locations = locationData?.data?.mapping || [];
  const totalItems = locationData?.data?.totalCount || 0;
  const totalPages = Math.ceil(totalItems/queryPageSize) || 0;

  return (
    <Wrapper>
      <TransactionsArea>
        <LocationsTable<Location>
          columnConfig={columnConfig}
          loading={isLoadingLocations || isFetching}
          totalPages={totalPages}
          rowData={locations}
          getColumnProps={columnPropGetter}
          hideFilters
          queryPageIndex={queryPageIndex}
          queryPageSize={queryPageSize}
          setQueryPageIndex={setQueryPageIndex}
          setQueryPageSize={setQueryPageSize}
          totalItems={totalItems}
          isPreviousData={isPreviousData}
        />
      </TransactionsArea>
    </Wrapper>
  );
};

const columnPropGetter = (col: Column<Location>) => {
  const { id } = col;
  let textAlign: 'start' | 'end';
  switch (id) {
    case 'View':
      textAlign = 'end';
      break;
    default:
      textAlign = 'start';
      break;
  }
  return {
    style: {
      textAlign,
    },
  };
};

const TransactionsArea = styled.div`
  margin-top: 50px;
  position: relative;
`;
