import styled from 'styled-components';
import {device} from "../../lib/utils";

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
  line-height: 28px;
  color: ${({ theme }) => theme.colors.primary.dark};
  margin: 0;
  font-family: 'Circular-Std';
  font-style: normal;
  text-align: center;
  letter-spacing: 0.0015em;
  margin-bottom: 16px;
  font-weight: 600;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.primary.midGrey};
  margin: 0;
  font-family: 'Circular-Std';
  font-style: normal;
  font-weight: 450;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.0125em;

  @media ${device.tablet} {
    font-size: 12px;
  }
`;

const ParagraphBold = styled.p`
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
  margin: 0;
  font-family: 'Circular-Std', sans-serif;
  color: ${({ theme }) => theme.colors.primary.black};
`;

const Paragraph = styled(ParagraphBold)`
  font-weight: 400;
`;

export { Title, Heading, ParagraphBold, Paragraph, Text };
