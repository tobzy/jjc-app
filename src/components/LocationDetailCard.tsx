import styled, { useTheme } from 'styled-components';
import { Paragraph, ParagraphBold } from './styled';

const Wrapper = styled.div`
  height: 92px;
  background: ${({ theme }) => theme.colors.primary.lightgrey};
  border-radius: 8px;
  padding: 0 24px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 16px;
`;

const BottomSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

interface IProps {
  title: string;
  amount?: string;
  disabled?: boolean;
}

export const LocationDetailCard = ({
  title,
  amount,
  disabled,
}: IProps): JSX.Element => {
  const theme: any = useTheme();
  const { grey } = theme.colors.primary;
  return (
    <Wrapper>
      <CardTitle className={disabled ? 'disabled' : ''}>{title}</CardTitle>
      <BottomSection>
        <CardAmount className={disabled ? 'disabled' : ''}>{amount}</CardAmount>
      </BottomSection>
    </Wrapper>
  );
};

const CardTitle = styled(ParagraphBold)`
  color: ${({ theme }) => theme.colors.primary.grey};

  &.disabled {
    color: ${({ theme }) => theme.colors.secondary.grey};
  }
`;

const CardAmount = styled(Paragraph)`
  color: ${({ theme }) => theme.colors.primary.black};
  font-size: 24px;
  font-family: 'Glacial Indifference-Bold', sans-serif;

  &.disabled {
    color: ${({ theme }) => theme.colors.secondary.grey};
  }
`;
