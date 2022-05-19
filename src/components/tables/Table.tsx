import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  border-spacing: 0;
  width: 100%;
`;

export default function Table({ className, children, ...props }: { className?: string; children: React.ReactNode }) {
  return (
    <StyledTable className={className} {...props}>
      {children}
    </StyledTable>
  );
}

Table.Head = ({ className, children, ...props }: { className?: string; children: React.ReactNode }) => (
  <thead className={className} {...props}>
    {children}
  </thead>
);

Table.Body = ({ className, children, ...props }: { className?: string; children: React.ReactNode }) => (
  <tbody className={className} {...props}>
    {children}
  </tbody>
);

Table.Foot = ({ className, children, ...props }: { className?: string; children: React.ReactNode }) => (
  <tfoot className={className} {...props}>
    {children}
  </tfoot>
);

Table.TH = ({ className, children, ...props }: { className?: string; children: React.ReactNode }) => (
  <th className={className} {...props}>
    {children}
  </th>
);

Table.TR = ({ className, children,onClick, ...props }: { className?: string; children: React.ReactNode, onClick?:() => void }) => (
  <tr className={className} {...props} onClick={() => onClick?.()}>
    {children}
  </tr>
);

Table.TD = ({ className, children, ...props }: { className?: string; children: React.ReactNode }) => (
  <td className={className} {...props}>
    {children}
  </td>
);
