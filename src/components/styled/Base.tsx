import styled from 'styled-components';

const Title = styled.h3`
  font-size: 13px;
  line-height: 20px;
  text-transform: uppercase;
  margin: 0;
  font-family: 'Glacial Indifference-Bold', sans-serif;
  color: ${({ theme }) => theme.colors.primary.black};
`;

const Heading = styled.h2`
  font-size: 28px;
  line-height: 42px;
  font-family: 'Glacial Indifference-Bold', sans-serif;
  color: #1a242d;
  margin: 0;
`;

const ParagraphBold = styled.p`
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
  margin: 0;
  font-family: 'Glacial Indifference-Regular', sans-serif;
  color: ${({ theme }) => theme.colors.primary.black};
`;

const Paragraph = styled(ParagraphBold)`
  font-weight: 400;
`;

export { Title, Heading, ParagraphBold, Paragraph };
