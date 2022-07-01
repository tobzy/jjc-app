import React from 'react';
import styled from 'styled-components';
import { Heading, Text } from './styled';
import { device } from '../lib/utils';

interface ICardProps {
  title: string;
  text: string;
  image: string;
  image2?: string;
  link?: string;
}

export const ScrollCard = ({ title, text, image, link, image2 }: ICardProps) => (
  <CardContainer>
    <LeftSection>
      <Heading>{title}</Heading>
      <Paragraph className="lp-section3-p">{text}</Paragraph>
      {!!link && (
        <a className="lp-section3-link" href="#download-app">
          {link}
        </a>
      )}
    </LeftSection>

    <Img className="lp-section3-img" image={image} image2={image2} />
  </CardContainer>
);

const CardContainer = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary.white};
  border-radius: 24px;
  margin-bottom: 100px;
  padding: 36px;

  h2 {
    text-align: left;
  }

  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const LeftSection = styled.section`
  width: 30%;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  padding-right: 15px;

  @media ${device.tablet} {
    width: 50%;
  }

  @media ${device.mobileL} {
    width: 100%;
    padding-right: 0px;
  }
`;

export const Paragraph = styled(Text)`
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.015em;
  margin: 0;
  text-align: left;
`;

const Img = styled.div<{ image: string; image2?: string }>`
  flex: 1;
  height: 273px;
  width: 70%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${(props) => props.image});

  @media ${device.tablet} {
    background-image: url(${(props) => props.image2});
    width: 50%;
    height: 312px;
  }

  @media ${device.mobileL} {
    background-image: url(${(props) => props.image});
    width: 100%;
    flex: none;
    height: 128px;
  }
`;
