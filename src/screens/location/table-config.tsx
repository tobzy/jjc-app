import styled from 'styled-components';
import { Cell, Column } from 'react-table';
import { Status, statusRenderMappings } from '../../lib/constants';
import { formatDate } from '../../lib/utils';
import {Location} from "../../services/location-service";

export interface LocationRow {
  id: string;
  organization: string;
  requestor: string;
  openDate: Date;
  amtRequested: number;
  amtApproved?: number;
  closeDate?: Date;
  status: Status;
  approver: string;
  walletAddress: string;
}

const ColoredDotSpan = styled.span`
  &:before {
    content: '\\25cf';
    color: ${({ color }) => color};
    margin-right: 5px;
  }
`;

const StyledStatus = ({ status }: { status: Status }): JSX.Element => {
  const { color, text } = statusRenderMappings[status];
  return <ColoredDotSpan {...{ color }}>{text}</ColoredDotSpan>;
};

export const columnConfig: Column<Location>[] = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Categories',
    accessor: 'categories',// @ts-ignore
    Cell: (props) => props.value?.join(", ") || '',
  },
  {
    Header: 'Color',
    accessor: 'color',
  },
  // {
  //   Header: 'Open Date',
  //   accessor: 'openDate',
  //   Cell: (props) => formatDate(props.value),
  // },
  {
    Header: 'Description',
    accessor: 'description',
  },
  {
    Header: 'Keywords',
    accessor: 'keywords',// @ts-ignore
    Cell: (props) => props.value?.join(", ") || '',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Opening Times',
    accessor: 'openingTimes',
    // Cell: ({ value }: Cell<LocationRow>) => <StyledStatus status={value} />,
  },
  {
    Header: 'Phone',
    accessor: 'phone',
  },
  {
    Header: 'State',
    accessor: 'state',
  },
];
