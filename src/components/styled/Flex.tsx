import styled from 'styled-components';

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

interface FlexInterface {
  Row: typeof Row;
  Column: typeof Column;
}

export const Flex: FlexInterface = { Row, Column };
