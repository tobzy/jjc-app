import styled from 'styled-components';
import logo from '../assets/images/icon.png';

interface ILogo {
  imageHeight?: number;
  leftAlign?: boolean;
  imageWidth?: number;
}

const Card = styled.div`
  cursor: pointer;
  z-index: 10;
  align-items: center;
`;

const LogoImage = styled.img`
  height: auto;
`;

export const Logo = ({ imageHeight, imageWidth = 100, leftAlign = false }: ILogo): JSX.Element => {
  return (
    <Card style={{ alignItems: leftAlign ? 'flex-start' : 'center' }}>
      <LogoImage src={logo} width={imageWidth} alt="JJC logo" />
    </Card>
  );
};
