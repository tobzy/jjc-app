import React from "react";
import styled from "styled-components";
import {device} from "../lib/utils";
import {Heading, Text} from "./styled";

interface ICardProps {
  title: string;
  text: string;
  image:string
  className?:string
}
export const Card = ({title, text, image, className}:ICardProps) => {
    return (
        <CardContainer className={className}>
          <Heading>{title}</Heading>
          <Paragraph>{text}</Paragraph>
          <Img src={image} alt="man-walking"/>
        </CardContainer>
    )
}

const CardContainer = styled.section`
  flex: 1;
  background: #FFFFFF;
  border-radius: 24px;
  padding: 32px 28px;
  
  @media ${device.mobileL} {
    width:100%
  }
`

const Paragraph = styled(Text)`
  max-width: 350px;
  text-align: center;
  margin: auto;
  margin-bottom: 40px;
`

const Img = styled.img`
  width:100%;
`