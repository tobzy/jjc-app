import styled from 'styled-components';
import Lottie from 'react-lottie-player/dist/LottiePlayerLight';
import animationData from '../assets/animations/loading.json';

export const Loading = (): JSX.Element => (
  <Container>
    <Wrapper>
      <Lottie loop play animationData={animationData} />
    </Wrapper>
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  width: 300px;
  height: 300px;
`;
